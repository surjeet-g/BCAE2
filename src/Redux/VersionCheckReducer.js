import {
  VERSIONCHECK_INIT,
  VERSIONCHECK_DATA,
  VERSIONCHECK_ERROR,
} from "./VersionCheckAction";

const versioncheckInitialState = {
  initVersionCheck: false,
  isVersionCheckError: false,
  versioncheckData: {},
};

const VersionCheckReducer = (state = versioncheckInitialState, action) => {
  switch (action.type) {
    case VERSIONCHECK_INIT:
      return {
        ...state,
        initVersionCheck: true,
        isVersionCheckError: false,
        versioncheckData: {},
      };

    case VERSIONCHECK_ERROR:
      return {
        ...state,
        initVersionCheck: true,
        isVersionCheckError: true,
        versioncheckData: action.data,
      };

    case VERSIONCHECK_DATA:
      return {
        ...state,
        initVersionCheck: false,
        isVersionCheckError: false,
        versioncheckData: action.data,
      };
    default:
      return state;
  }
};
export default VersionCheckReducer;
