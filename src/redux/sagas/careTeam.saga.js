import axios from 'axios';
import { call, put, takeLatest, select } from 'redux-saga/effects';

/**
 * Saga to handle sending an email to an invited user.
 * 
 * @param {Object} action - The action object containing the payload with invitation details.
 */
function* sendEmailToInvitedUser(action) {
  try {
    yield call(axios.post, '/api/care-team', action.payload);
    yield put({ type: 'FETCH_CARE_TEAM_MEMBERS' });
    yield put({ type: 'INVITATION_SENT' }); // New action to indicate success
  } catch (error) {
    console.error('Error sending email in careTeam saga', error);
    yield put({ type: 'SET_ERROR', payload: 'Failed to send invitation email' });
  }
}

/**
 * Saga to handle the verification of an invitation code.
 * 
 * @param {Object} action - The action object containing the payload with the invitation code.
 */
function* verifyInvitationCode(action) {
  try {
    // Extract the invitationCode from the action's payload
    const invitationCode = action.payload;
    console.log(invitationCode);
    // Pass the invitationCode string directly in the request
    const response = yield call(
      axios.post, '/api/care-team/verify-invitation', invitationCode
    );
    if (response.status === 200) {
      yield put({ type: 'SET_LOVED_ONE', payload: response.data });
      yield put({ type: 'VERIFICATION_SUCCESSFUL' });
    }
  } catch (error) {
    console.error('Error verifying invitation code:', error);
    yield put({ type: 'SET_ERROR', payload: 'Invalid invitation code' });
  } finally {
    yield put({ type: 'SET_SUBMITTING', payload: false }); // New action to reset submitting state
  }
}

/**
 * Saga to fetch care team members from the server.
 */
function* fetchCareTeamMembers() {
  try {
    const user = yield select(state => state.user);
    const response = yield call(axios.get, `/api/care-team/members/${user.loved_one_id}`);
    console.log("Fetched Team Members:", response.data);
    yield put({ type: 'SET_CARE_TEAM_MEMBERS', payload: response.data });
  } catch (error) {
    console.error('Error fetching care team members:', error);
    yield put({ type: 'SET_ERROR', payload: 'Failed to fetch care team members' });
  }
}

/**
 * The main saga that listens for actions related to the care team functionalities.
 */
function* careTeamSaga() {
  yield takeLatest('FETCH_CARE_TEAM_MEMBERS', fetchCareTeamMembers);
  yield takeLatest('SEND_EMAIL_TO_INVITED_USER', sendEmailToInvitedUser);
  yield takeLatest('VERIFY_INVITATION_CODE', verifyInvitationCode);
}

export default careTeamSaga;