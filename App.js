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

// let navigation = useNavigation;

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
        // if (
        //   appState.current.match(/inactive|background/) &&
        //   nextAppState === "active"
        // ) {
        //   // console.log("App has come to the foreground!");
        // }
        // console.log("faa", nextAppState);
        // appState.current = nextAppState;
        // setAppStateVisible(appState.current);
        // console.log("AppState", appState.current);
        if (nextAppState == "background") {
        }
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
