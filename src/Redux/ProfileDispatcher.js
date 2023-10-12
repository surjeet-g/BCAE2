import Toast from "react-native-toast-message";
import { serverCall } from "..//Utilities/API";
import { saveDataToDB } from "../Storage/token";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";
import { storageKeys } from "../Utilities/Constants/Constant";
import {
  USERTYPE,
  getCustomerUUID,
  getUserId,
  getUserType
} from "../Utilities/UserManagement/userInfo";
import {
  initProfile,
  setProfileData,
  setProfileError, setProfileRolesDataInStore, setProfileRolesErrorDataInStore, setProfileSwitchedDataInStore, setProfileSwitchedErrorDataInStore, setSearchProfileData,
  setSearchProfileDataError,
  setServiceData,
  setUserSelectedProfile
} from "./ProfileAction";


// export var parsedCustServiceList = [];


/**
* Reducer Dispatch
* Handle API call for fetch profile information
* @memberOf EditProfile
* @param  {Object} navigation for handle timeout issue
* @returns {Object} Dispatcher to reducer
*/
export function fetchMyProfileData(navigation = null) {
  return async (dispatch) => {
    dispatch(initProfile());
    let profileResult;
    const userType = await getUserType();
    let typeOfUser =
      userType == USERTYPE.CUSTOMER ? USERTYPE.CUSTOMER : USERTYPE.USER;
    if (userType == USERTYPE.CUSTOMER) {
      const customerUUDI = await getCustomerUUID();

      profileResult = await serverCall(
        endPoints.PROFILE_DETAILS + customerUUDI,
        requestMethod.GET,
        {},
        navigation
      );
    }
    //bussines user
    else {
      const userId = await getUserId();
      profileResult = await serverCall(
        endPoints.USERS_SEARCH + userId,
        requestMethod.GET,
        {},
        navigation
      );
    }

    console.log("hiting", profileResult);
    if (profileResult?.success) {
      dispatch(
        setProfileData({ ...profileResult?.data?.data, typeOfUser: typeOfUser })
      );
      return true;
    } else {
      dispatch(setProfileError([]));
      return false;
    }
  };
}

export function fetchSavedProfileDataByUser(customerUUDI) {
  return async (dispatch) => {
    // dispatch(initProfile());

    const currentUserType = await getUserType();
    const isConsumer = currentUserType == USERTYPE.CUSTOMER;

    if (!isConsumer) {
      let custServiceResult = await serverCall(
        endPoints.SERVICE_LIST,
        requestMethod.POST,
        { customerUuid: customerUUDI.toString() }
      );
      const custServiceList = custServiceResult?.data?.data;
      if (custServiceList.length > 0) {
        const parsedata = custServiceList.map(item => {
          return { description: item.serviceName, code: item.serviceNo }
        });
        dispatch(setServiceData(parsedata));
      }
    }

    // if (serviceList.length > 0) {
    //   const parsedata = serviceList.map(item => {
    //     return { description: item.serviceName, code: item.serviceNo }
    //   });
    //   setServiceList(parsedata)
    //   setService({
    //     productNo: get(serviceList, '[0].productDetails[0].productNo', ""),
    //     code: parsedata[0].code,
    //     description: parsedata[0].description,
    //   });
    // }


    console.log("task fetch");
    const userType = await getUserType();
    let typeOfUser =
      userType == USERTYPE.CUSTOMER ? USERTYPE.CUSTOMER : USERTYPE.USER;
    let profileResult = await serverCall(
      endPoints.PROFILE_DETAILS + customerUUDI,
      requestMethod.GET,
      {}
    );

    if (profileResult?.success) {
      dispatch(setUserSelectedProfile({ ...profileResult?.data?.data, typeOfUser }));
      return true;
    } else {
      // dispatch(setProfileError([]));
      return false;
    }
  };
}
/**
* Reducer Dispatch
* Handle API call for search customer information
* @memberOf EditProfile
* @param  {string} search for search keyword
* @returns {Object} Dispatcher to reducer
*/
export function seachCustomers(search = "", limit = 5, page = 0) {
  console.log('search api req..', search)
  return async (dispatch) => {
    // dispatch(initProfileSearch());
    //todo search params
    let profileResult = await serverCall(
      `${endPoints.SEACH_CUSTOMERS}?limit=${limit}&page=${page}`,
      requestMethod.POST,
      {
        "customerName": search
      }
    );
    console.log("task - pro result", profileResult);
    if (profileResult?.success) {

      const len = profileResult?.data?.data?.rows?.length;
      console.log("profile resp len..", len);
      if (search == "" || search.length < 5) {
        dispatch(setSearchProfileData([]));

        Toast.show({
          type: "bctError",
          text1: "Please enter minimum 5 characters",
        });
      }
      else {
        dispatch(setSearchProfileData(profileResult?.data?.data?.rows));
      }

      // if (len == 0) dispatch(setSearchEmpty(true));
    } else {
      dispatch(setSearchProfileDataError([]));
      return false;
    }
  };
}
/**
* Reducer Dispatch
* Handle API call for update customer details
* @memberOf EditProfile
* @param  {Object} obj payload 
* @returns {Object} Dispatcher to reducer
*/
export function updateProfileData(obj, navigation, isCustomer) {
  return async (dispatch) => {
    dispatch(initProfile());

    const customerUUDI = await getCustomerUUID();
    const userId = await getUserId();

    console.log("hitts isCossoumer2:", isCustomer, "userId", userId, "payload", obj)
    let result = await serverCall(
      isCustomer
        ? endPoints.UPDATE_MOBILE_USER + customerUUDI
        : endPoints.UPDATE_BUSINESS_USER + userId,
      requestMethod.PUT,
      obj,
      navigation
    );
    console.log("hitts isCossoumer:", result);
    if (result.success) {
      dispatch(setProfileError([]));
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      return true;
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(setProfileError([]));
      return false;
    }
  };
}


export function fetchProfileRoles(navigation = null) {
  return async (dispatch) => {

    const url = endPoints.SWITCH_ROLE;
    console.log("fetchProfileRoles url..", url);


    let fetchProfileRolesResult = await serverCall(
      url,
      requestMethod.GET,
      {},
      navigation
    );

    console.log("fetchProfileRolesResult..", fetchProfileRolesResult.data);
    if (fetchProfileRolesResult.success) {
      dispatch(setProfileRolesDataInStore(fetchProfileRolesResult.data));
    } else {
      dispatch(setProfileRolesErrorDataInStore(fetchProfileRolesResult));
    }

  };
}


export function switchUserRole(props) {
  return async (dispatch) => {

    console.log("switchUserRole props..", props);
    console.log("switchUserRole url..", url)

    const { currDept, currDeptDesc, currDeptId, currRole, currRoleDesc,
      currRoleId, userId } = props

    let url = endPoints.USER_ROLE_SWITCH + userId;

    let params = {
      currDept,
      currDeptDesc,
      currDeptId,
      currRole,
      currRoleDesc,
      currRoleId
    };

    console.log("switchUserRole params..", params);

    let result = await serverCall(url, requestMethod.PUT, params);
    // console.log("switchUserRole1 result..", props.setUserSwitched);
    // console.log("switchUserRole2 result..", props.userSwitched);

    if (result.success) {
      await saveDataToDB(storageKeys.CURRENT_ROLE_DESC, currRoleDesc);
      await saveDataToDB(storageKeys.CURRENT_DEPT_DESC, currDeptDesc);
      await saveDataToDB(storageKeys.CURRENT_ROLE_ID, currRoleId);
      await saveDataToDB(storageKeys.CURRENT_DEPT_ID, currDeptId);

      Toast.show({
        type: "bctSuccess",
        text1: "" + result.data.message,
      });

      props.setUserSwitched(!props.userSwitched)

      dispatch(setProfileSwitchedDataInStore(result.data));
      // RNRestart.Restart();
      props.navigation.navigate("BottomBar")
    } else {
      Toast.show({
        type: "bctError",
        text1: "" + result.message,
      });
      dispatch(setProfileSwitchedErrorDataInStore(result));
    }

  };
}