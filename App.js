import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/Redux/Store";
import MyStack from "./src/Navigation/MyStack";
import Toast from "react-native-toast-message";
import { ToastTemplete } from "./src/Components/ToastTemplete";

import { LogBox, SafeAreaView, AppState } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { storageKeys } from "./src/Utilities/Constants/Constant";
import { getData, saveData } from "./src/Storage/DB";
import moment from "moment";
import { getToken } from "./src/Storage/token";
// import RNRestart from "react-native-restart";
import theme from "./src/Utilities/themeConfig";
import { logoutUserWithOutRedux } from "./src/Redux/LogoutDispatcher";

const toastConfig = {
  bctError: ({ text1, props }) => (
    <ToastTemplete bgColor="red" text={text1} type="error" />
  ),
  bctSuccess: ({ text1, props }) => (
    <ToastTemplete bgColor="green" text={text1} type="error" />
  ),
};

const App = () => {
  // const appState = useRef(AppState.currentState);
  // useEffect(() => {
  //   const subscription = AppState.addEventListener(
  //     "change",
  //     async (nextAppState) => {
  //       const token = await getToken();

  //       if (nextAppState == "active") {
  //         if (
  //           token.accessToken != null &&
  //           typeof token.accessToken != "undefined"
  //         ) {
  //           const lastLogin = await getData(storageKeys.LAST_LOGINT_TIMESTAMP);

  //           if (lastLogin.length > 0) {
  //             const lastLoggedDate = moment(lastLogin).format(
  //               "YYYY-MM-DD HH:mm:ss"
  //             );
  //             const currentDate = moment(new Date()).format(
  //               "YYYY-MM-DD HH:mm:ss"
  //             );

  //             const diffBwCurrentDate = moment.duration(
  //               moment(currentDate).diff(moment(lastLoggedDate))
  //             );

  //             const hour = diffBwCurrentDate.asMinutes();

  //             if (hour > 15) {
  //               if (await logoutUserWithOutRedux()) {
  //                 RNRestart.restart();
  //               }
  //             }
  //           }
  //         } else {
  //           console.log("user not logged in");
  //         }
  //       } else {
  //         if (
  //           token.accessToken != null &&
  //           typeof token.accessToken != "undefined"
  //         ) {
  //           await saveData(
  //             storageKeys.LAST_LOGINT_TIMESTAMP,
  //             moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  //           );
  //         }
  //       }
  //     }
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <MyStack />
        </PaperProvider>
        <Toast config={toastConfig} position="bottom" bottomOffset={30} />
      </StoreProvider>
    </SafeAreaView>
  );
};

export default App;
