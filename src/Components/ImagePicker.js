import React, { useCallback, useState } from "react";
import {
    Alert, FlatList, Image, Pressable, StyleSheet,
    Text, TouchableOpacity, View
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import {
    launchCamera,
    launchImageLibrary
} from "react-native-image-picker";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import Toast from "react-native-toast-message";
import { color, spacing } from "../Utilities/Constants/Constant";

import { strings } from '../Utilities/Language';

export const ImagePicker = ({ attachmentModalVisible, setAttachmentModalVisible }) => {

    const [fileAttachments, setFileAttachments] = useState([]);
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

    const handleDocumentSelection = useCallback(async () => {
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
                fileAttachments.push({
                    fileType: response[0]?.type,
                    fileName: response[0]?.name,
                    fileSize: response[0]?.size,
                    uri: response[0]?.uri,
                    base64: await RNFS.readFile(response[0]?.uri, "base64"),
                });
                setFileAttachments(fileAttachments);
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
    }, []);
    const onDeleteClicked = (key) => {
        Alert.alert(
            strings.attention,
            strings.are_you_sure_delete + " \n\n" + key,
            [
                {
                    text: strings.cancel,
                },
                {
                    text: strings.ok,
                    onPress: () => {
                        const newArray = fileAttachments?.filter(
                            (data) => data?.fileName != key
                        );
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
                    { text: strings.ok, onPress: () => { } },
                ]);
            }
        } else {
            Alert.alert(strings.attention, strings.max_number_of_file, [
                { text: strings.ok, onPress: () => { } },
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

    return (
        <View>

            <AttachmentList
                attachmentList={fileAttachments}
                onDeleteClicked={onDeleteClicked}
            ></AttachmentList>
            <Pressable
                style={styles.textAttach}
                onPress={() => showAttachmentModal()}
            >
                <Text
                    style={{
                        color: color.INPUT_TEXT_BORDER,
                        fontSize: 14,
                        marginBottom: 5,
                    }}
                >
                    {strings.attachment + " (" + strings.optional + ")"}
                </Text>

                <Image
                    style={{
                        position: "absolute",
                        right: 5,
                        bottom: 5,
                        height: 20,
                        width: 20,
                        resizeMode: "cover",
                    }}
                    source={require("../Assets/icons/attachment.png")}
                ></Image>
            </Pressable>
            {attachmentModalVisible && <View
            >
                <View
                    style={{

                        alignItems: "center",
                        position: "absolute",
                        bottom: 80,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            alignItems: "center",
                            flex: 1,

                            flexDirection: "row",
                            backgroundColor: color.BCAE_OFF_WHITE,
                            borderRadius: 10,
                            padding: 10,
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
                                source={require("../Assets/icons/documents.png")}
                            />
                            <Text>{strings.document}</Text>
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
                                source={require("../Assets/icons/camera.png")}
                            />
                            <Text style={styles.upperText}>{strings.camera}</Text>
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
                                source={require("../Assets/icons/gallery.png")}
                            />
                            <Text style={styles.upperText}>{strings.gallery}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>}
        </View>
    )
}

const AttachmentList = ({ attachmentList, onDeleteClicked }) => (
    <View style={{ marginTop: 20 }}>
        {attachmentList?.length > 0 ? (
            <FlatList
                contentContainerStyle={{
                    paddingBottom: 20,
                    paddingLeft: 2,
                    paddingRight: 2,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={attachmentList}
                key={attachmentList.fileName}
                renderItem={({ item }) => (
                    <AttachmentItems item={item} onDeleteClicked={onDeleteClicked} />
                )}
            />
        ) : (
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{ marginTop: 10, fontSize: 14, color: color.BCAE_PRIMARY }}
                >
                    Attachment list is empty !!
                </Text>
            </View>
        )}
    </View>
);
const AttachmentItems = ({ item, onDeleteClicked }) => {


    function onPressedSavedLocation() {
        //navigation.navigate('ManageExpense', {
        // expenseId: id
        //});
        // navigation.navigate('MyTicketDetails', {ticketNo:ticketNo, intxnId:intxnId, intxnType:intxnType})
    }

    return (
        <Pressable

        >
            <View style={{ paddingTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 4, justifyContent: "center" }}>
                        <Image source={{ uri: item.uri }} style={{ width: 50, height: 50 }} />
                        <Text style={[styles.status]}>{item.fileName}</Text>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            color: color.BLACK,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => onDeleteClicked(item.fileName)}
                        >
                            <Image
                                style={[styles.rightArrow, styles.searchIcon]}
                                source={require("../Assets/icons/ic_delete_red.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    upperLogo: {
        width: spacing.WIDTH_30,
        height: spacing.WIDTH_30,
    },

});
