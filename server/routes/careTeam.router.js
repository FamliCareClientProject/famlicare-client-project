const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
require("dotenv").config();

// Setup for SendGrid to send emails
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

// GET endpoint to fetch care team members by loved one's ID
router.get('/members/:lovedOneId', (req, res) => {
  const lovedOneId = req.params.lovedOneId;
  // SQL query to select first name, last name, and email of users associated with a loved one
  const sqlText = `SELECT first_name, last_name, email FROM "user" WHERE loved_one_id = $1`;
  
  pool.query(sqlText, [lovedOneId])
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => {
      console.error('Error fetching care team members:', error);
      res.status(500).json({ message: 'Failed to fetch care team members' });
    });
});

// POST endpoint to send an invitation to join a care team
router.post("/", (req, res) => {
  const userEmail = req.body.email;
  const lovedOneId = req.user.loved_one_id;

  // SQL query to insert a new invitation into the database
  const sqlText = `INSERT INTO invitations("email", "loved_one_id")
                        VALUES
                            ($1, $2)
                        RETURNING invitation_code;`;
  const sqlValues = [userEmail, lovedOneId];

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      const invitationCode = dbRes.rows[0].invitation_code;
      // Preparing the email content
      const email = {
        to: userEmail,
        from: {
          name: "FamliCare App",
          email: "famlicareappclientproject@gmail.com",
        },
        subject: "Your FamliCare App CareTeam Invitation Code!",
        text: `Welcome to FamliCare. Your Invitation Code is: ${invitationCode}.`,
        html: `<h1>Welcome to FamliCare</h1>
                    <h2>Your Invitation Code is: ${invitationCode}</h2>
                    <p>You have been invited to join a FamliCare CareTeam. Please go to the FamliCare App
                     to make a new account. Copy and paste this code when prompted to join the CareTeam</p>
                     <h3>Thank you, FamliCare App</h3>`,
      };

      return sgMail.send(email);
    })
    .then(() => {
      console.log("Email Sent Successfully!");
      res.status(201).json({ message: 'Invitation sent successfully' });
    })
    .catch((error) => {
      console.error("Error in invitation process:", error);
      res.status(500).json({ message: 'Failed to send invitation' });
    });
});

// POST endpoint to verify an invitation code and update user's care team
router.post('/verify-invitation', async (req, res) => {
  const { invitationCode } = req.body;
  const userId = req.user.id;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // SQL to check if the invitation code exists
    const checkInvitationSql = `
      SELECT loved_one_id 
      FROM invitations 
      WHERE invitation_code = $1;
    `;
    const invitationResult = await client.query(checkInvitationSql, [invitationCode]);

    if (invitationResult.rows.length === 0) {
      throw new Error('Invalid invitation code');
    }

    const { loved_one_id } = invitationResult.rows[0];

    // SQL to update the user's loved_one_id and set them as a non-admin
    const updateUserSql = `
      UPDATE "user"
      SET loved_one_id = $1, 
          is_admin = false
      WHERE id = $2
      RETURNING id, username, first_name, last_name, email, phone_number, profile_picture_url, loved_one_id, is_admin;
    `;
    const updateResult = await client.query(updateUserSql, [loved_one_id, userId]);

    // SQL to delete the used invitation code
    const deleteInvitationSql = `
      DELETE FROM invitations
      WHERE invitation_code = $1;
    `;
    await client.query(deleteInvitationSql, [invitationCode]);

    await client.query('COMMIT');

    res.status(200).json(updateResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error verifying invitation code:', error);
    res.status(400).json({ message: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;