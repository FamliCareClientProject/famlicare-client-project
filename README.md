
# FamliCare

FamliCare is a mobile-optimized web application designed to support and empower caregivers. It provides tools for care coordination, communication, and document management, helping caregivers navigate their journey with more confidence and less stress.

## Check out our deployed version

If you would like to see the deployed version of this app, please click the link below.
[Famlicare App](https://famlicare-0348fad2c799.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed on your system:

- Node.js (version 14.0 or higher)
- npm (usually comes with Node.js)
- PostgreSQL (version 12.0 or higher)

### Installing

1. Fork the repository in Github 
2. Clone the repository:

   ```os
   git clone https://github.com/your-username/famlicare.git
   cd famlicare
   ```

3. Install server dependencies:

   ```os
   cd server
   npm install
   ```

4. Install client dependencies:

   ```os
   cd ../client
   npm install
   ```

5. Set up the database:
   Start postgres if not running already by using opening up the Postgres.app, or if       using Homebrew you can use the `command brew services start postgresql.
      `postgres

   Create a database named 
    `famlicare`
   
    If you would like to name your database something else, you will need to change         `famlicare` to the name of your new database name in server/modules/pool.js
   
6.The queries in the tables.sql files are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries

Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
   
7. Set up environment variables:
   Create a `.env` file in the server directory and add the following. Note: The keys must be named exactly as what is provided. Please Reference the Handoff document for more details:

While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net/#google_vignette). If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.

   ```SERVER_SESSION_SECRET= superDuperSecret

AWS_ACCESS_KEY_ID = THIS_IS_WHERE_THE_KEY_GOES
AWS_SECRET_ACCESS_KEY = THIS_IS_WHERE_THE_KEY_GOES
AWS_REGION = THIS_IS_WHERE_THE_KEY_GOES
AWS_BUCKET_NAME = THIS_IS_WHERE_THE_KEY_GOES
SENDGRID_API_KEY = THIS_IS_WHERE_THE_KEY_GOES

NODE_ENV= production
PRODUCTION_URL = THIS_IS_THE_HEROKU_FAMLICARE_WEB_ADDRESS

CORS_ORIGIN_HOST = http://localhost:5173

VITE_CORS_ORIGIN_HOST = http://localhost:5001
   ```

8. Run database migrations:

   ```os
   cd ../server
   npm run migrate
   ```

9. Start the development server:

   ```npm run server```

10. In a new terminal, start the client:

   ```npm run client```

The application should now be running on `http://localhost:5173`.

## Deployment

The application is deployed on Heroku. To deploy your own instance:

1. Create a new Heroku app
2. Connect your GitHub repository to the Heroku app
3. Set up the necessary environment variables in Heroku
4. Deploy the main branch

## Usage
1. A user can create a new account, create a LovedOne (the user who creates the LovedOne will be defaulted as the admin of a CareTeam), invite users to join the CareTeam.
2. An Admin user can upload, view, download, and share documents in the CareVault.
3. A standard user can view and upload documents in the CareVault.
4. Standard and Admin users can send messages to the members of the CareTeam in the messages component.
5. Standard and Admin users can view all of the members of the CareTeam.
6. Invited users can receive an invitation code via email, register a new account and join a CareTeam with the invitation code.

Video walkthrough of application usage: 
[FamliCare Walkthrough](https://youtu.be/5T8_dC_ZM8A)

## Built With

- [React](https://reactjs.org/) - The web framework used
- [Express](https://expressjs.com/) - Backend framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Socket.io](https://socket.io/) - Used for real-time messaging
- [Multer](https://github.com/expressjs/multer) - Used for handling file uploads

## Authors

- **Janet** - messaging, care team component
- **Mustafe** - messaging
- **Jason** - theme styling, create a loved one flow
- **Alex** - care vault
- **Zeyini** - registration flow, profile component

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Prime Digital Academy for providing the opportunity to work on this project
- Our client for their valuable input and feedback
- All caregivers who inspired this application

## Support 
If you have suggestions or issues, please email 
at janet.lscanlon@gmail.com or vangalexa25@gmail.com

```markdown
