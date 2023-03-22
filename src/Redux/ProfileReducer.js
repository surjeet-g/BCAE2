import get from "lodash.get";
import {
  PROFILE_DATA,
  PROFILE_ERROR,
  PROFILE_INIT,
  PROFILE_RESET,
  PROFILE_SEARCH_DATA,
  PROFILE_SEARCH_DATA_RESET,
  PROFILE_SEARCH_ERROR,
  PROFILE_SEARCH_INIT,
  PROFILE_SET_FORM,
  SET_USER_SEARCH,
} from "./ProfileAction";

const mySavedProfileInitialState = {
  initProfile: false,
  userSearchString: "",
  initSeachProfile: false,
  profileError: false,
  profileSearchError: false,
  savedProfileData: {},
  profileSearchData: [],
  formData: {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    gender: "",
    genderError: "",
    idValue: "",
    nationality: "",
    location: "",
    locationError: "",
  },
};

const ProfileReducer = (state = mySavedProfileInitialState, action) => {
  switch (action.type) {
    case PROFILE_SEARCH_INIT:
      return {
        ...state,
        initProfile: true,
        profileError: false,
        savedProfileData: {},
      };
    case PROFILE_INIT:
      return {
        ...state,
        initSeachProfile: true,
        profileError: false,
        profileSearchError: {},
      };
    case PROFILE_SEARCH_DATA_RESET:
      return {
        ...state,
        profileSearchData: [],
      };
    case SET_USER_SEARCH:
      console.log("task - profile text search reducer", action.data);

      return {
        ...state,
        userSearchString: action.data,
      };
    case PROFILE_SEARCH_ERROR:
      return {
        ...state,
        initSeachProfile: false,
        profileError: true,
        profileSearchError: action.data,
      };
    case PROFILE_SEARCH_DATA:
      return {
        ...state,
        initSeachProfile: false,
        profileError: false,
        profileSearchData: action.data,
      };
    case PROFILE_DATA:
      return {
        ...state,
        initProfile: false,
        profileError: false,
        savedProfileData: action.data,
        formData: {
          ...state.formData,
          firstName: get(action.data, "firstName", ""),
          lastName: get(action.data, "lastName", ""),
          gender: {
            code: get(action.data, "genderDesc.code", ""),
            description: get(action.data, "genderDesc.description", ""),
          },
          idValue: get(action.data, "idValue", ""),
          location: get(action.data, "customerAddress[0]", ""),

          nationality: get(action.data, "customerContact[0].country", ""),
        },
      };
    case PROFILE_ERROR:
      return {
        ...state,
        initProfile: false,
        profileError: true,
        savedProfileData: action.data,
      };
    case PROFILE_RESET:
      state = mySavedProfileInitialState;
      return state;
    case PROFILE_SET_FORM:
      let tempFormData = state.formData;
      tempFormData[action.data.field] = action.data.value;
      if (action?.clearError) {
        tempFormData[action.data.field + "Error"] = "";
      }
      return {
        ...state,
        formData: tempFormData,
      };

    default:
      return state;
  }
};
export default ProfileReducer;
