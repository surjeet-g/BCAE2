import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { List, TextInput, useTheme } from "react-native-paper";
import { CustomInput } from "../Components/CustomInput";
import { color, fontSizes, spacing } from "../Utilities/Constants/Constant";

export const CustomDropDownFullWidth = (props) => {
  const {
    selectedValue,
    setValue = () => {},
    caption = "",
    placeHolder = "",
    data,
    customStyle = {},
    onChangeText,
    disabled = false,
  } = props;

  const [hideShow, setHideShow] = useState(false);
  const { colors } = useTheme();

  const onSelected = (item) => {
    setValue(item.description);
    onChangeText(item);
    setHideShow(false);
  };

  const ondropDownClick = () => {
    setHideShow(!hideShow);
  };

  const renderItem = ({ item, index }) => (
    <List.Item
      title={item.description}
      titleStyle={{
        fontSize: 10,
        padding: 0,
        margin: 0,
      }}
      style={{}}
      onPress={() => onSelected(item)}
    />
  );

  return (
    <View style={{ zIndex: 1, marginTop: 10 }}>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          variant="labelSmall"
          style={{
            marginBottom: 6,
            marginLeft: 8,
            color: colors.onSurfaceVariant,
          }}
        >
          {caption}
        </Text>
        <Pressable onPress={() => (disabled ? {} : ondropDownClick())}>
          <CustomInput
            {...props}
            disabled={disabled}
            hideCaption={true}
            editable={false}
            caption={placeHolder || caption}
            placeholder={placeHolder || caption}
            style={{ ...styles.textInput, ...customStyle }}
            value={selectedValue}
            right={
              <TextInput.Icon
                onPress={() => (disabled ? {} : ondropDownClick())}
                style={{ width: 23, height: 23 }}
                icon="chevron-down"
              />
            }
          />
        </Pressable>
      </View>

      {hideShow && (
        <View style={styles.dropDownCard}>
          <FlatList
            nestedScrollEnabled
            data={data ?? []}
            contentContainerStyle={{ zIndex: 9999999999 }}
            renderItem={renderItem}
            keyExtractor={(item, index) => `key-${index}`}
            // keyExtractor={item => item.description}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    // marginBottom: spacing.WIDTH_5,
  },
  textInput: {
    height: 45,
    width: "100%",
    borderBottomColor: color.INPUT_TEXT_BORDER,
    borderBottomWidth: 0.8,
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  dropDownCard: {
    // shadowColor: '#171717',
    maxHeight: spacing.HEIGHT_50 * 5,
    paddingTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "white",
    borderRadius: spacing.WIDTH_6,
    width: "100%",
    marginVertical: spacing.WIDTH_10,
    elevation: 3,
  },
  dropDownText: {
    color: color.DARK_GREY,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
  },
});
