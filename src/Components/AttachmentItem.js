import { View, Text, Image, Pressable } from "react-native";
import React from "react";

const AttachmentItem = (props) => {
  const { item, onDeleteClicked, showDeleteIcon = false, index } = props;
  return (
    <View
      style={{
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#AEB3BE",
        margin: 5,
        width: 70,
        height: 70,
        flexDirection: "row",
      }}
    >
      {item.fileType.includes("pdf") ? (
        <Image
          source={require("../Assets/icons/ic_pdf.png")}
          style={{
            flex: 1,
            height: 70,
            width: 70,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#AEB3BE",
          }}
        />
      ) : item.fileType.includes("msword") ? (
        <Image
          source={require("../Assets/icons/ic_word.png")}
          style={{
            flex: 1,
            height: 70,
            width: 70,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#AEB3BE",
          }}
        />
      ) : (
        <Image
          source={{ uri: item.uri }}
          style={{
            flex: 1,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#AEB3BE",
            resizeMode: "cover",
          }}
        />
      )}

      {showDeleteIcon && (
        <Pressable activeOpacity={0.5} onPress={() => onDeleteClicked(index)}>
          <Image
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: 15,
              width: 15,
            }}
            source={require("../Assets/icons/ic_attachment_remove.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

export default AttachmentItem;
