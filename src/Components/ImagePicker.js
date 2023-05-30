import React, { useCallback } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { spacing } from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language";
import AttachmentItem from "./AttachmentItem";
var { height, width } = Dimensions.get("screen");

export const ImagePicker = ({
  attachmentModalVisible,
  setAttachmentModalVisible,
  fileAttachments,
  setFileAttachments,
}) => {
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
        mediaType: "photo|video",
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

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.xls,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
        allowMultiSelection: true,
        base64: true,
      });

      if (response[0]?.size < 5000000) {
        setFileAttachments([
          ...fileAttachments,
          {
            fileType: response[0]?.type,
            fileName: response[0]?.name,
            fileSize: response[0]?.size,
            uri: response[0]?.uri,
            base64: await RNFS.readFile(response[0]?.uri, "base64"),
          },
        ]);
      } else {
        Toast.show({
          type: "bctError",
          text1: strings.max_per_file_size,
        });
      }
      setAttachmentModalVisible(false);
    } catch (err) {
      // console.warn(err);
    }
  };

  const onDeleteClicked = (index) => {
    Alert.alert(
      strings.attention,
      strings.are_you_sure_delete + " \n\n" + fileAttachments[index].fileName,
      [
        {
          text: strings.cancel,
        },
        {
          text: strings.ok,
          onPress: () => {
            const newArray = fileAttachments?.filter((data, i) => index !== i);
            setFileAttachments(newArray);
          },
        },
      ]
    );
  };
  const showAttachmentModal = () => {
    if (fileAttachments.length < 5) {
      let totalSize = 0;
      fileAttachments.forEach((element) => {
        totalSize += element.fileSize;
      });
      if (totalSize < 25000000) {
        setAttachmentModalVisible(true);
      } else {
        Alert.alert(strings.attention, strings.max_file_size, [
          { text: strings.ok, onPress: () => {} },
        ]);
      }
    } else {
      Alert.alert(strings.attention, strings.max_number_of_file, [
        { text: strings.ok, onPress: () => {} },
      ]);
    }
  };
  const openCamara = () => {
    launchCamera(
      {
        mediaType: "photo|video",
        includeBase64: true,
        width: 1024,
        height: 1024,
        compressImageQuality: 1,
      },
      (response) => {
        setAttachmentModalVisible(false);
        if (response.didCancel) {
          console.log("User cancelled image picker");
          Toast.show({
            type: "bctError",
            text1: "User cancelled image picker",
          });
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
          Toast.show({
            type: "bctError",
            text1: "ImagePicker Error: " + response.error,
          });
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
          // alert(response.customButton);
        } else if (response?.errorCode) {
          let errorMsg = "";
          switch (response?.errorCode) {
            case "camera_unavailable":
              errorMsg = "Camara unavailable";

              break;
            case "permission":
              errorMsg = "Permission not grant";

              break;
            case "others":
              errorMsg = "Technical error";

              break;

            default:
              errorMsg = "Technical error";
              break;
          }
          Toast.show({
            type: "bctError",
            text1: errorMsg,
          });
        } else {
          // const source = { uri: response.uri };

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
  };
  const launchCamera1 = () => {
    // let options = {
    //   storageOptions: {
    //     skipBackup: true,
    //     path: "images",
    //     mediaType: "photo",
    //     includeBase64: true,
    //     maxHeight: 200,
    //     maxWidth: 200,
    //   },
    // };
    // if (Platform.OS === "ios") {

    // }

    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            request(PERMISSIONS.IOS.CAMERA)
              .then((result) => {
                console.warn("point three", result);
                openCamara();
              })
              .catch((error) => console.log(error));

            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CAMERA)
              .then((result) => {
                console.warn("point w", result);
                openCamara();
              })
              .catch((error) => console.log(error));
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.warn("greant", result);
            openCamara();

            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // …
      });

    // setAttachmentModalVisible(false);
  };
  const EmptyAttachmentItem = (props) => {
    return (
      <Pressable
        style={{
          borderRadius: 6,
          borderWidth: 1,
          borderColor: "#AEB3BE",
          padding: 20,
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => showAttachmentModal()}
      >
        <Image source={require("../Assets/icons/add_tickets.png")} />
      </Pressable>
    );
  };

  return (
    <View>
      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 400, color: "#000000" }}>
          Attachment
        </Text>
        <Text style={{ fontSize: 11, fontWeight: 400, color: "#AEB3BE" }}>
          (Maximum 5 files can be attached with max file size of 5MB each)
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{}, {}, {}, {}, {}]}
          //   key={item.id}
          renderItem={({ item, index }) =>
            fileAttachments[index]?.fileName?.length > 0 ? (
              <AttachmentItem
                index={index}
                item={fileAttachments[index]}
                showDeleteIcon={true}
                onDeleteClicked={onDeleteClicked}
              />
            ) : (
              <EmptyAttachmentItem />
            )
          }
        />
      </View>

      {attachmentModalVisible && (
        <>
          <Pressable
            onPress={() => {
              setAttachmentModalVisible(false);
            }}
            style={{
              // backgroundColor: "gray",
              // opacity: .5,
              position: "absolute",
              width: width,
              height: height,
              elevation: 9999,
              zIndex: 9,
            }}
          ></Pressable>
          <View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                bottom: 100,
                flexDirection: "column",
                backgroundColor: "white",
                elevation: 1,
                paddingBottom: 30,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // position: "relative",
                  marginVertical: 10,
                  // height: 300,
                  marginHorizontal: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // position: "relative",
                    marginVertical: 10,

                    width: "85%",
                    // height: 300,
                    marginHorizontal: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 600,
                      color: "#202223",
                      fontSize: 19,
                      // flex: 1,
                    }}
                  >
                    Choose Files
                  </Text>
                  <Text>Select files for attachments</Text>
                </View>
                <Icon
                  onPress={() => {
                    setAttachmentModalVisible(false);
                  }}
                  name="close-circle"
                  size={25}
                  color={"#000"}
                />
              </View>

              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Pressable
                  onPress={() => handleDocumentSelection()}
                  style={{
                    marginTop: spacing.HEIGHT_6,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "33%",
                  }}
                >
                  <Image
                    style={styles.upperLogo}
                    source={require("../Assets/icons/picker_document.png")}
                  />
                </Pressable>

                <Pressable
                  onPress={() => {
                    // setAttachmentModalVisible(false);
                    launchCamera1();
                  }}
                  style={{
                    marginTop: spacing.HEIGHT_6,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "33%",
                  }}
                >
                  <Image
                    style={styles.upperLogo}
                    source={require("../Assets/icons/picker_camera.png")}
                  />
                </Pressable>

                <Pressable
                  onPress={() => launchImageLibrary1()}
                  style={{
                    marginTop: spacing.HEIGHT_6,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "33%",
                  }}
                >
                  <Image
                    style={styles.upperLogo}
                    source={require("../Assets/icons/picker_gallery.png")}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  upperLogo: {
    width: 80,
    height: 80,
  },
});
