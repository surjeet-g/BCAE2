
// import ImageEditor from "@react-native-community/image-editor";
import React, { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
const camraIcon = require('../../Assets/icons/cus_cam_switch.png')
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// console.log("ImageEditor", ImageEditor)
export const FaceDetection = ({ isIdcard = false, seURI = () => { } }) => {
    const [tempImg, setTempImg] = useState({})
    const [type, setType] = useState(RNCamera.Constants.Type.front);
    const switchCamara = () => {
        if (type === RNCamera.Constants.Type.front) {
            setType(RNCamera.Constants.Type.back)
        }
        else {
            setType(RNCamera.Constants.Type.front)
        }
    }
    const [img_uri, setImgURI] = useState("")
    const [box, setBox] = useState(null);
    const cameraRef = useRef(null);
    const [flag, setFlag] = useState(false)

    const handleNegData = (val) => val < 0 ? 1 : val

    const cropFace = async (imageUri) => {
        try {
            const croppedImage = await ImageCropPicker.openCropper({
                path: imageUri
            });
            return croppedImage.path;
        } catch (error) {
            console.error('Failed to crop face:', error);
            throw error;
        }
    };


    const onFacesDetecteds = async (param) => {
        const { faces } = param
        // console.log("param", param)
        if (!flag && faces[0] && cameraRef.current) {
            if (faces[0]) {
                setBox({
                    boxs: {
                        width: faces[0].bounds.size.width,
                        height: faces[0].bounds.size.height,
                        x: faces[0].bounds.origin.x,
                        y: faces[0].bounds.origin.y,
                        yawAngle: faces[0].yawAngle,
                        rollAngle: faces[0].rollAngle,
                    },
                    rightEyePosition: faces[0].rightEyePosition,
                    leftEyePosition: faces[0].leftEyePosition,
                    bottomMounthPosition: faces[0].bottomMounthPosition,
                });
            } else {
                setBox(null);
            }



        }
    };
    const takePicture = async () => {
        // return null
        if (cameraRef.current) {
            console.log("cameraRef", cameraRef.current);
            const options = { quality: 0.5, base64: true, };
            const data = await cameraRef.current.takePictureAsync(options)
            setTempImg({})
            console.log("data", data)
            setTempImg({
                // uri: data.uri,
                type: 'image/jpeg',
                name: `${new Date().toISOString()}image.jpg`,
            })
            console.log("data", data)

            // const cropRegion = { x: box.boxs.x, y: box.boxs.y, height: box.boxs.height, width: box.boxs.width, };
            // console.log("cross", cropRegion)
            // const path = await RNPhotoManipulator.crop(image, cropRegion, {
            //     width: data.width,
            //     height: data.height,
            // })
            // console.log("path", path)
            // setImgURI(path)
            // return null

            if (isIdcard) {
                const uriVal = await cropFace(data.uri, {});

                seURI({
                    type: 'image/jpeg',
                    name: `${new Date().toISOString()}image.jpg`,
                    uri: uriVal
                })

            }
            else {
                seURI({
                    type: 'image/jpeg',
                    name: `${new Date().toISOString()}image.jpg`,
                    uri: data.uri
                })
            }


        }
    }
    return (
        <View style={{
            ...styles.container, position: "absolute",
            top: 10,
        }}>
            <View style={styles.container}>

                <RNCamera

                    useCamera2Api={false}

                    ref={cameraRef}
                    style={styles.camera}
                    type={type}
                    captureAudio={false}
                    onFacesDetected={onFacesDetecteds}

                // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                />
                {box && (
                    <>

                        <View
                            style={styles.bound({
                                width: box.boxs.width,
                                height: box.boxs.height,
                                x: box.boxs.x,
                                y: box.boxs.y,
                            })}
                        />
                    </>
                )}
            </View>
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
                {/* {img_uri &&
                    <Image source={{ uri: img_uri }} style={{ width: 300, height: 300 }} />
                } */}
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> Capture </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={switchCamara} style={styles.capture}>
                    <Image source={camraIcon}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>


            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,

        width: width,
        height: height,
        zIndex: 999,
        backgroundColor: 'gray',
    },
    camera: {
        flexGrow: 1,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    bound: ({ width, height, x, y }) => {
        return {
            position: 'absolute',
            top: y,
            left: x - 50,
            height,
            width,
            borderWidth: 5,
            borderColor: 'red',
            zIndex: 3000,
        };
    },
    glasses: ({ rightEyePosition, leftEyePosition, yawAngle, rollAngle }) => {
        return {
            position: 'absolute',
            top: rightEyePosition.y - 60,
            left: rightEyePosition.x - 100,
            resizeMode: 'contain',
            width: Math.abs(leftEyePosition.x - rightEyePosition.x) + 100,
        };
    },
});