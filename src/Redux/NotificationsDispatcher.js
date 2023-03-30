import {
  initNotificationsData,
  setNotificationsData,
} from "./NotificationsAction";
const EMPTY_DATA = [];
const DATA = [
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
  {
    notificationId: 2757,
    source: "Complaint",
    referenceId: 240509,
    isViewed: "N",
    createdAt: "2022-11-05T07:15:23.616Z",
    title: "No Power Supply",
    reason: "Due to maintainance",
    subject: "Your Interaction ID #1234586 has been closed",
    customerId: 53583,
  },
];

export function getNotificationsData() {
  return async (dispatch) => {
    //const userInfo = await getDataFromDB(storageKeys.PROFILE_DETAILS);
    dispatch(initNotificationsData());
    dispatch(setNotificationsData(DATA));
    // let params = {};

    // let result = await serverCall(
    //   `${endPoints.NOTIFICATIONS}/${userInfo.customerId}`,
    //   requestMethod.GET,
    //   params
    // );

    // if (result.success) {
    //   //result.data.row
    //   //read api trigger
    //   try {
    //     await serverCall(
    //       `${endPoints.NOTIFICATIONS}/${userInfo.customerId}`,
    //       requestMethod.PUT,
    //       params
    //     );
    //   } catch (err) {}
    //   dispatch(setNotificationsData(result.data.data.rows));
    // } else {
    //   dispatch(setNotificationsError(result));
    // }
  };
}
