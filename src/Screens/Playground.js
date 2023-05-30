import React, { useRef } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

export const Playground = () => {
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const getNamea = async (num) => {
    await sleep(3000);
    return num;
  };

  const onMessage = (data) => {
    console.log("$$$-data", data);
    alert(data.nativeEvent.data);
  };

  const runScript = `
      document.body.style.backgroundColor = 'red';
      // setTimeout(function() { window.alert('hi') }, 2000);
      window.ReactNativeWebView.postMessage("https://comquestbrunei1.sharepoint.com/_layouts/15/download.aspx?UniqueId=5ff40e27-0c64-4aa2-83b3-ff5cf125e297&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvY29tcXVlc3RicnVuZWkxLnNoYXJlcG9pbnQuY29tQDU3NDU4M2IxLTBkOWEtNGMyNC1iOTdjLTBkOTc5ZDkzNWU5YyIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2ODI0MTkxOTYiLCJleHAiOiIxNjgyNDIyNzk2IiwiZW5kcG9pbnR1cmwiOiJIcDVhcE1Ndm5iVjA0cE05NTJyQkZpMHpRMUtVU3l4c2M4M0hDdks1RGVvPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTI2IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJZemRoTW1GallUQXRZakE1T1MweU1EQXdMVEpsTkdFdE9HRmlaalkwWkdZNU5tRTIiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiWldRMk5XTXdaVFV0WkdWbFl5MDBaRFJpTFRrM09USXRORFl4WmpnelkySTBNVFF3IiwiYXBwX2Rpc3BsYXluYW1lIjoiQkNBRSBBcHAiLCJuYW1laWQiOiJhODFlMWEyOC0zNjAxLTRlNzAtYjcwYi1kYjViYTIxNWI0YTRANTc0NTgzYjEtMGQ5YS00YzI0LWI5N2MtMGQ5NzlkOTM1ZTljIiwicm9sZXMiOiJzZWxlY3RlZHNpdGVzIGFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUgYWxsc2l0ZXMubWFuYWdlIGFsbGZpbGVzLndyaXRlIGFsbGZpbGVzLnJlYWQgYWxsc2l0ZXMuZnVsbGNvbnRyb2wiLCJ0dCI6IjEiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjpudWxsLCJpcGFkZHIiOiI2MS42LjIwMC4xODYifQ.MGo1MjhVckZtNE5ubVJTSXlQQ1JVYlpSRnFYSWZoa2pKQ1ROUm1ERmVCYz0&ApiVersion=2.0");
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  const webviewRef = useRef();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Pressable
        style={{ marginTop: 30, backgroundColor: "red" }}
        onPress={async () => {
          (async function () {
            for await (const num of [1, 2, 3, 4]) {
              const d = await getNamea(num)
              console.log("num :", d);
              // Expected output: 1
              if (num == 3) break; // Closes iterator, triggers return

            }
          })();
        }}
      >
        <Text>Click me</Text>
      </Pressable> */}
      {/* <TouchableOpacity
        onPress={() => sendDataToWebView()}
        style={{
          padding: 20,
          width: 300,
          backgroundColor: "#6751ff",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>
          Send Data To WebView / Website
        </Text>
      </TouchableOpacity> */}
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        startInLoadingState={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        mixedContentMode={"always"}
        onMessage={onMessage}
        injectedJavaScript={runScript}
        source={{
          uri: "https://st-td123.comquest-brunei.com:13443/chatbot/1877341",
        }}
        onFileDownload={({ nativeEvent }) => {
          const { downloadUrl } = nativeEvent;
          // --> Your download code goes here <--
          console.log("$$$-downloadUrl", downloadUrl);
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
