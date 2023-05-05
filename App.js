import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { Provider as StoreProvider } from "react-redux";
import { ToastTemplete } from "./src/Components/ToastTemplete";
import MyStack from "./src/Navigation/MyStack";
import { store } from "./src/Redux/Store";

import { LogBox, SafeAreaView, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
// import { storageKeys } from "./src/Utilities/Constants/Constant";
// import { getData, saveData } from "./src/Storage/DB";
// import moment from "moment";
// import { getToken } from "./src/Storage/token";
// import RNRestart from "react-native-restart";
import theme from "./src/Utilities/themeConfig";
// import { logoutUserWithOutRedux } from "./src/Redux/LogoutDispatcher";

const toastConfig = {
  bctError: ({ text1, props }) => (
    <ToastTemplete bgColor="red" text={text1} type="error" />
  ),
  bctSuccess: ({ text1, props }) => (
    <ToastTemplete bgColor="green" text={text1} type="error" />
  ),
};

const App = () => {


  useEffect(() => {
    // LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    // LogBox.ignoreAllLogs(); //Ignore all log notifications

  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        // animated={true}
        backgroundColor={"#7a71e8"}
      // barStyle={statusBarStyle} 
      // showHideTransition={statusBarTransition}
      // hidden={hidden}
      />
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
