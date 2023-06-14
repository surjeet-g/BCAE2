import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Divider, RadioButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UploadDocument = () => {
  const [value, setValue] = React.useState("passport");
  const [fileAttachments, setFileAttachments] = React.useState([]);
  useEffect(() => {
    setFileAttachments([])
  }, [])
  const launchImageLibrary1 = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: "photo|video",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
    };
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        width: 1024,
        height: 1024,
        compressImageQuality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
          // Toast.show({
          //     type: "bctError",
          //     text1: "User cancelled image picker",
          // });
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
          Toast.show({
            type: "bctError",
            text1: "ImagePicker Error: " + response.error,
          });
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else if (response.errorCode) {
          Toast.show({
            type: "bctError",
            text1: "Technical Issue",
          });
        } else {
          if (response?.assets[0]?.fileSize < 5000000) {
            setFileAttachments([
              ...fileAttachments,
              {
                fileType: response?.assets[0]?.type,
                fileName: response?.assets[0]?.fileName,
                fileSize: response?.assets[0]?.fileSize,
                uri: response?.assets[0]?.uri,
                base64: response?.assets[0]?.base64,
              },
            ]);
          } else {
            Toast.show({
              type: "bctError",
              text1: strings.max_per_file_size,
            });
          }
        }
      }
    );
    setAttachmentModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#5E71A6",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Select ID Type
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              value={value}
              status={value === "passport" ? "checked" : "unchecked"}
              onPress={() => setValue("passport")}
            />
            <Text style={{ color: "#fff", fontWeight: "600" }}>{"Passport"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <RadioButton
              value={value}
              status={value === "license" ? "checked" : "unchecked"}
              onPress={() => setValue("license")}
            />
            <Text style={{ color: "#fff", fontWeight: "600" }}>{"License"}</Text>
          </View>
        </View>
        <Pressable onPress={() => alert("Open file picker")}>
          <Image
            source={require("../../Assets/icons/ic_upload_doc.png")}
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          />
        </Pressable>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Upload File
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "400",
              fontSize: 14,
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: "#F5AD47",
            borderRadius: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            position: "absolute",
            bottom: -25,
            alignSelf: "center",
          }}
          onPress={() => alert("Open Camera")}
        >
          <Icon name={"camera-outline"} size={30} color={"#fff"} />
          <Text
            style={{
              textAlign: "center",
              marginLeft: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Use Camera
          </Text>
        </Pressable>
      </View>

      <View style={{ padding: 10, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Divider
            style={{
              borderWidth: 1,
              borderColor: "#8E8F95",
              borderStyle: "dashed",
              width: "30%",
            }}
          />
          <Text
            style={{
              color: "#9A9A9A",
              fontWeight: "400",
              fontSize: 12,
              marginHorizontal: 10,
            }}
          >
            OR
          </Text>
          <Divider
            style={{
              borderWidth: 1,
              borderColor: "#8E8F95",
              borderStyle: "dashed",
              width: "30%",
            }}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: "#4C5A81",
            borderRadius: 30,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 20,
          }}
          onPress={() => alert("Start IVR")}
        >
          <Icon name={"microphone"} size={30} color={"#fff"} />
          <Text
            style={{
              textAlign: "center",
              marginLeft: 10,
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Start with IVR
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UploadDocument;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
  },
});
