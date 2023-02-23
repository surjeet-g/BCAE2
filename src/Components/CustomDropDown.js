import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { color, spacing, fontSizes } from "../Utilities/Constants/Constant";
import { List, MD3Colors, TextInput, useTheme } from "react-native-paper";
import { CustomInput } from "../Components/CustomInput";

export const CustomDropDown = (props) => {
  const { selectedValue, setValue } = props;
  const [hideShow, setHideShow] = useState(false);
  const { colors } = useTheme();

  let customStyle = props.customStyle ?? {};

  const onSelected = (item) => {
    setValue(item.description);
    props.onChangeText(item);
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
    <View style={{ zIndex: 0, marginTop: 10 }}>
      <View style={{ zIndex: 0, height: 50 }}>
        {/* <Pressable
          onPress={() => ondropDownClick()}
          style={{ flexDirection: "row" }}
        > */}
        <CustomInput
          editable={false}
          caption={props.placeHolder}
          placeholder={props.placeHolder}
          style={{ ...styles.textInput, ...customStyle }}
          value={selectedValue}
          right={
            <TextInput.Icon
              onPress={() => ondropDownClick()}
              style={{ width: 23, height: 23 }}
              icon="chevron-down"
            />
          }
        />
        {/* </Pressable> */}
      </View>

      {hideShow && (
        <View style={styles.dropDownCard}>
          <FlatList
            data={props?.data ?? []}
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
