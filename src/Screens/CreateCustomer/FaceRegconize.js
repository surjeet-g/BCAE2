import React, { useEffect } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";

import get from 'lodash.get';
import { launchImageLibrary } from "react-native-image-picker";
import { Divider, RadioButton, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ClearSpace } from "../../Components/ClearSpace";
import { commonStyle } from '../../Utilities/Style/commonStyle';
import { FACE_RECOG_GET_START, FACE_RECOG_TAKE_SELFI, FACE_RECOG_UPLOAD_DOCUS, FACE_RECOG_UPLOAD_DOCUS_LOADER, FACE_RECOG_UPLOAD_DOCUS_SUCCESS, FACE_RECOG_UPLOAD_SELFI_SUCCESS } from './Steps';
const progresImg = require('../../Assets/icons/progressing.png')
const faceRegImg = require('../../Assets/icons/faceReg.png')
const camImg = require('../../Assets/icons/cust_cam.png')
const verImg = require('../../Assets/icons/cus_verify.png')
const avatrCropImg = require('../../Assets/icons/cust_avater_crop.png')
const uplImg = require('../../Assets/icons/cust_upload.png')
const succsImg = require('../../Assets/icons/cus_success.gif')
const loadImg = require('../../Assets/icons/cus_loading_circle.gif')
const upImg = require('../../Assets/icons/cust2_upload_icon_.png')
const tickImg = require('../../Assets/icons/cust_done_black.png')
const idImg = require('../../Assets/icons/cust_id_card.png')
const warImg = require('../../Assets/icons/cust_error.gif')
const { height, width } = Dimensions.get('screen');
const customWidth = width * .9
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
const TextPoint = ({ texts = [] }) => {
  return (
    <View>
      {texts.map((text) => {
        return (
          <View style={commonStyle.row_start_center}>
            <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: "#686B6C", marginRight: 7 }} />
            <Text variant="labelSmall" style={{ color: "#686B6C", fontSize: 10 }}>{text}</Text>
          </View>
        )
      })
      }


    </View>
  )
}
export const Facerecogne = ({ step = FACE_RECOG_GET_START, faces = {} }) => {
  if (step == FACE_RECOG_UPLOAD_DOCUS_SUCCESS || step == FACE_RECOG_UPLOAD_DOCUS_LOADER) {
    const isLoaderScreen = step == FACE_RECOG_UPLOAD_DOCUS_LOADER
    const faceURI = get(faces, 'face.uri', '')
    const idURI = get(faces, 'idCard.uri', '')

    return (
      <View style={{ ...styles.container, ...commonStyle.center }}>
        <Text variant="labelSmall">{isLoaderScreen ? "Matching...." : "Match complete successfully"}</Text>
        <ClearSpace size={5} />

        <View style={{ ...commonStyle.row_space_arround_between_center, width: width * .8, }}>
          <View style={{ ...commonStyle.center, width: "50%" }}>
            {faceURI &&
              <Image source={{ uri: faceURI }}
                style={{
                  marginTop: 5,
                  height: 50,
                  width: 50,
                  borderRadius: 50

                }} />
            }
            <View style={{
              marginTop: 4,
              backgroundColor: "#EAF0FF",
              borderRadius: 6,
              borderColor: "#3E73CB",
              borderStyle: "solid",
              borderWidth: .5,
              marginTop: 12,
              paddingHorizontal: 30
            }}>
              <Text>Photo</Text>
            </View>
          </View>

          <View style={{ ...commonStyle.center, width: "50%" }}>
            {idURI &&
              <Image
                source={{ uri: idURI }}
                style={{
                  marginTop: 5,
                  height: 50,
                  width: 50,
                  borderRadius: 50

                }} />
            }

            <View
              style={{
                marginTop: 4,
                backgroundColor: "#EAF0FF",
                borderRadius: 6,
                borderColor: "#3E73CB",
                borderStyle: "solid",
                borderWidth: .5,
                marginTop: 12,
                paddingHorizontal: 30
              }}>
              <Text>ID</Text>
            </View>

          </View>
          <ClearSpace size={5} />

        </View>
        <Image source={isLoaderScreen ? loadImg : succsImg} style={{
          marginTop: 5,
          height: height * .4,
          width: "100%"
        }} />
        {isLoaderScreen &&
          <>
            <Text variant="bodyMedium">Please wait its verifying...</Text>
            <ClearSpace size={3} />
          </>
        }
        <Text variant="bodySmall">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</Text>

      </View>
    )
  }
  //upload success screen
  if (step == FACE_RECOG_UPLOAD_SELFI_SUCCESS) {
    return (
      <View style={{ ...styles.container, marginTop: 40 }}>
        <Image source={succsImg} style={{
          height: 400
        }} />
        <Text variant="bodyMedium">Face captured {"\n"} successfully!</Text>
      </View>
    )

  }

  if (step == FACE_RECOG_TAKE_SELFI || step == FACE_RECOG_UPLOAD_DOCUS) {
    return (
      <View style={styles.container}>
        <View
          style={step == FACE_RECOG_TAKE_SELFI ? styles.activeItem : styles.item}>
          <View style={{ ...commonStyle.row_start, marginHorizontal: 0, padding: 13, paddingHorizontal: 5 }} >
            <View style={{ flex: .19 }}>
              <Image source={camImg} style={{ width: 50, height: 50, opacity: (step == FACE_RECOG_UPLOAD_DOCUS) ? .5 : 1 }} />
            </View>
            <View style={{ flex: .71, justifyContent: "center" }}>
              <Text variant="labelLarge" style={{ color: (step != FACE_RECOG_UPLOAD_DOCUS) ? "black" : "#D3D3D3" }}>Face recognization</Text>
            </View>
            <View style={{ flex: .06, alignItems: "flex-end", }}>
              <Image source={tickImg} style={{ width: 20, height: 20, }} />

            </View>

          </View>
          {step == FACE_RECOG_TAKE_SELFI &&
            <>
              <Image source={avatrCropImg} style={{ width: "100%" }} />
              <View style={{
                marginHorizontal: 0, padding: 13, paddingHorizontal: 5
              }}>
                <TextPoint texts={["Hold your phone up in front of your face and wait photo to be taken", "Lorem Ipsum is simply dummy text of the printing and typesetting industry."]} />
              </View>
            </>
          }

        </View>
        <View
          style={step == FACE_RECOG_UPLOAD_DOCUS ? styles.activeItem : styles.item}>
          <View style={{ ...commonStyle.row_start, marginHorizontal: 0, padding: 13, paddingHorizontal: 5 }} >
            <View style={{ flex: .19 }}>
              <Image source={(step == FACE_RECOG_UPLOAD_DOCUS) ? upImg : uplImg} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ flex: .81, justifyContent: "center" }}>
              <Text variant="labelLarge" style={{ color: (step == FACE_RECOG_UPLOAD_DOCUS) ? "black" : "#D3D3D3" }}>Upload document</Text>
            </View>
          </View>
          {step == FACE_RECOG_UPLOAD_DOCUS &&
            <>
              <Image source={idImg} style={{ width: "100%" }} />
              <View style={{
                marginHorizontal: 0, padding: 13, paddingHorizontal: 5
              }}>
                <TextPoint texts={["Hold your phone up in front of your face and wait photo to be taken", "Lorem Ipsum is simply dummy text of the printing and typesetting industry."]} />
              </View>
            </>
          }
        </View>
        <View
          style={styles.item}>
          <View style={{ ...commonStyle.row_start, marginHorizontal: 0, padding: 13, paddingHorizontal: 5 }} >
            <View style={{ flex: .19 }}>
              <Image source={verImg} style={{ width: 50, height: 50 }} />
            </View>
            <View style={{ flex: .81, justifyContent: "center" }}>
              <Text variant="labelLarge" style={{ color: "#D3D3D3" }}>Verify</Text>
            </View>

          </View>
        </View>

      </View>

    )
  }
  return (
    <View style={styles.container}>
      <Text variant="bodySmall">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
      <ClearSpace size={4} />
      <Image source={faceRegImg} style={{

      }} />
      <ClearSpace size={3} />
      {step == FACE_RECOG_GET_START ?
        (<>
          <Image source={progresImg}
            style={{
              width: width * .8
            }}
            resizeMode="contain"
          />
          <Text variant="bodySmall">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</Text>
        </>) :
        <>
          <Text variant="bodyMedium">Take Selfie</Text>
          <ClearSpace size={2} />
          <Text variant="bodySmall">Have these ready and enroll in 2 stepss</Text>
          <ClearSpace size={3} />
          <View style={{
            flexDirection: "column",
            justifyContent: "flex-start"
          }}>
            <View style={commonStyle.row_space_arround_evenly}>
              <View
                style={{
                  backgroundColor: "#FFE8C9",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  ...commonStyle.center
                }}>
                <Text>1</Text>
              </View>

              <View style={{ marginLeft: 12, justifyContent: "center" }}>
                <Text variant="labelMedium">Good Lighting</Text>
                <ClearSpace size={1} />
                <Text variant="labelSmall">Make sure you are in a well lit area.</Text>
              </View>
            </View>
            <ClearSpace size={2} />
            <View style={commonStyle.row_space_arround_evenly}>
              <View
                style={{
                  backgroundColor: "#FFE8C9",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  ...commonStyle.center
                }}>
                <Text>2</Text>
              </View>

              <View style={{ marginLeft: 12, justifyContent: "center" }}>
                <Text variant="labelMedium">Look Straight</Text>
                <ClearSpace size={1} />
                <Text variant="labelSmall" style={{ flexWrap: 'wrap' }}>Hold your phone at eye level and    {"\n"}look straight to the camera</Text>
              </View>
            </View>
          </View>
        </>
      }
    </View>
  )
}
export default UploadDocument;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 25,

  },
  activeItem: {
    borderRadius: 5,
    borderColor: "#DADADA",
    borderWidth: 1,
    borderStyle: 'solid',
    width: customWidth

  },
  item: {
    width: customWidth
  }
});
