import React, { useRef, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import { strings } from "../../Utilities/Language";


const Chat = ({ route, navigation }) => {
    const webViewRef = useRef();
    let contactNo = `112323`;


    const [myscreenmae, _] = useState("Chat");
    const [showWebView, setShowWebView] = useState(true);

    // const fetchMyProfileData = () => dispatch(fetchSavedProfileData());
    // useEffect(() => {
    //     fetchMyProfileData();

    //     const willFocusSubscription = navigation.addListener("focus", () => {
    //         setTimeout(function () {
    //             setShowWebView(true);
    //         }, 2000);
    //     });
    //     return willFocusSubscription;
    // }, []);

    const onRefreshClicked = () => {
        Alert.alert(strings.attention, strings.refresh_chat, [
            {
                text: strings.cancel,
            },
            {
                text: strings.ok,
                onPress: () => {
                    webViewRef.current.reload();
                },
            },
        ]);
    };
    return (
        <SafeAreaView
            style={[
                styles.container,

            ]}
        >


            {!showWebView && (
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 200,
                    }}
                >
                    {/* loader */}
                    <Text style={styles.emptyList}>{strings.please_wait}</Text>
                </View>
            )}

            {showWebView && (
                <WebView
                    startInLoadingState={true}
                    // allowUniversalAccessFromFileURLs={true}
                    // javaScriptEnabled={true}
                    // mixedContentMode={'always'}
                    onMessage={(data) => {
                        // console.warn("hiting on message", data.nativeEvent.data)
                        // Linking.openURL(data.nativeEvent.data)
                    }}
                    ref={webViewRef}
                    source={{
                        uri: 'https://bcae-test.comquest-brunei.com:1443/bcae-chat/',
                    }}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // emptyList: {
    //     fontSize: 20,
    //     color: color.BCAE_PRIMARY,
    // },
});

export default Chat;
