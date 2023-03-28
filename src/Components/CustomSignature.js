import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import React, { useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";

const CustomSignature = ({ showPreview = false }) => {
  const [signature, setSignature] = useState(null);
  const ref = useRef();

  const imgHeight = 200;
  const signStyle = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              height: ${imgHeight}px;}`;

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signatureData) => {
    // console.log("Signature: ", signatureData);
    setSignature(signatureData);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    alert("Please sign and save!!!");
  };

  const handleClear = () => {
    ref.current.clearSignature();
    setSignature(null);
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.esign}>E-Signature</Text>
        <Pressable onPress={handleClear} style={styles.clearView}>
          <Image
            style={styles.clearImg}
            source={require("../Assets/icons/ic_close.png")}
          />
          <Text style={styles.clearTxt}>Clear</Text>
        </Pressable>
      </View>
      <View style={styles.signContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onEnd={handleEnd}
          autoClear={false}
          webStyle={signStyle}
        />
      </View>
      {/* Show Preview View */}
      {showPreview && signature && (
        <View>
          <Text style={styles.showPrevTxt}>Showing Preview here</Text>
          <Image
            resizeMode={"cover"}
            style={styles.previewImgStyle}
            source={{ uri: signature }}
          />
        </View>
      )}
    </View>
  );
};

export default CustomSignature;

const styles = StyleSheet.create({
  container: { flexDirection: "column", padding: 20, flex: 1 },
  signContainer: {
    height: 200,
    borderWidth: 1,
    borderColor: "#686B6C",
    borderStyle: "dashed",
    marginTop: 10,
    borderRadius: 10,
  },
  headerView: { flexDirection: "row", justifyContent: "space-between" },
  esign: { fontWeight: 400, fontSize: 16, color: "#000" },
  clearView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clearImg: { height: 15, width: 15, marginRight: 3, tintColor: "#000" },
  clearTxt: { fontWeight: 400, fontSize: 12, color: "#000" },
  previewImgStyle: {
    alignSelf: "center",
    width: "80%",
    height: 180,
    margin: 20,
    backgroundColor: "red",
  },
  showPrevTxt: {
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 400,
    color: "green",
  },
});
