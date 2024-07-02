/**
 * Care Team Reducer
 * 
 * This reducer manages the state related to care teams, including the current loved one, error messages,
 * invitation status, verification status, members of the care team, and the submitting status.
 * 
 * Maintenance Tips:
 * - Keep the `initialState` up-to-date with any new state properties added to ensure consistency across the application.
 * - Ensure that each action type updates the state immutably to prevent unintended side effects.
 * - Consider using a constants file for action types to avoid typos and improve maintainability. This can also make it easier to manage action types used across multiple reducers or middleware.
 * - Regularly review the reducer for potential optimization opportunities, such as combining similar case statements or extracting repeated logic into helper functions.
 * - As the application scales, consider splitting this reducer into smaller, more focused reducers if the state structure becomes too complex.
 * 
 * Troubleshooting:
 * - If state updates are not reflecting in the UI, check that the correct action types are being dispatched. Incorrect action types or payloads can lead to unexpected state shapes.
 * - Use Redux DevTools to inspect state changes and action payloads. This can help identify issues where the state may not be updating as expected.
 * - Ensure that all relevant components are connected to the Redux store and are selecting the correct state slices. Mistakes in mapStateToProps or useSelector hooks can lead to components not receiving the expected data.
 * - For issues related to asynchronous actions (e.g., API calls), ensure that the actions are dispatched correctly and that any middleware (like redux-thunk or redux-saga) is set up correctly.
 * - When encountering unexpected behavior after adding new actions or cases, review the reducer logic for any cases that might be unintentionally falling through or missing break statements (in case of a switch statement).
 */
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