// Initial state of the care team reducer
const initialState = {
  lovedOne: null,
  error: null,
  invitationSent: false,
  verificationSuccessful: false,
  members: [],
  isSubmitting: false, 
};

const careTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOVED_ONE":
      return {
        ...state,
        lovedOne: action.payload,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isSubmitting: false, // Reset submitting state on error
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "INVITATION_SENT":
      return {
        ...state,
        invitationSent: true,
        isSubmitting: false, // Reset submitting state on success
      };
    case "VERIFICATION_SUCCESSFUL":
      return {
        ...state,
        verificationSuccessful: true,
        isSubmitting: false, // Reset submitting state on success
      };
    case "SET_CARE_TEAM_MEMBERS":
      return { 
        ...state, 
        members: action.payload 
      };
    case "SET_SUBMITTING": // New case to handle submitting state
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case "RESET_INVITATION_STATUS": // New case to reset invitation status
      return {
        ...state,
        invitationSent: false,
      };
    case "RESET_VERIFICATION_STATUS": // New case to reset verification status
      return {
        ...state,
        verificationSuccessful: false,
      };
    default:
      return state;
  }
};

export default careTeamReducer;

// Maintenance Tips:
// - Keep the initialState up-to-date with any new state properties added.
// - Ensure that each action type updates the state immutably.
// - Consider using a constant file for action types to avoid typos and improve maintainability.

// Troubleshooting:
// - If state updates are not reflecting in the UI, check that the correct action types are being dispatched.
// - Use Redux DevTools to inspect state changes and action payloads.
// - Ensure that all relevant components are connected to the Redux store and are selecting the correct state slices.