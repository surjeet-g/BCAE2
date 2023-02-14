import React, { useEffect, useRef, useState } from "react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./src/Redux/Store";
import MyStack from "./src/Navigation/MyStack";
import Toast from "react-native-toast-message";
import { ToastTemplete } from "./src/Components/ToastTemplete";
import { useNavigation } from "@react-navigation/native";
import { LogBox, SafeAreaView, AppState } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/Utilities/Constants/Constant";
import { getData, saveData } from "./src/Storage/DB";
import moment from "moment";
import { getToken } from "./src/Storage/token";
import { logoutUserSectionTimeOut } from "./src/Redux/LogoutDispatcher";
let navigator = useNavigation;

const toastConfig = {
  bctError: ({ text1, props }) => (
    <ToastTemplete bgColor="red" text={text1} type="error" />
  ),
  bctSuccess: ({ text1, props }) => (
    <ToastTemplete bgColor="green" text={text1} type="error" />
  ),
};

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        const token = await getToken();
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("htting background");

          if (
            token.accessToken != null &&
            typeof token.accessToken != "undefined"
          ) {
            const lastLogin = await getData("LAST_LOGIN");

            if (lastLogin.length > 0) {
              const lastLoggedDate = moment(lastLogin).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              const currentDate = moment(new Date()).format(
                "YYYY-MM-DD HH:mm:ss"
              );

              const diffBwCurrentDate = moment.duration(
                moment(currentDate).diff(moment(lastLoggedDate))
              );

              const hour = diffBwCurrentDate.asMinutes();

              if (hour > 10) {
                // await logoutUserSectionTimeOut(navigator);

                Toast.show({
                  type: "bctSuccess",
                  text1: "TimeOut",
                });
              }
            }
          } else {
            console.log("user not logged in");
          }
        } else {
          await saveData(
            "LAST_LOGIN",
            moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          );
        }
        // console.log("user in background");
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

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
