import get from "lodash.get";
import React from "react";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { commonStyle } from "../Utilities/Style/commonStyle";

/**
* Group check box
*
* @param {func} setValues set enable check box
* @return {number} values active values for check box
* @return {JSX} return dom

*/
export const CheckGroupbox = ({ data, label, setValues, values }) => {
  console.log("intial data", data, "values", values);
  const { colors } = useTheme();
  if (get(data, "length", 0) == 0) return null;

  return (
    <View style={{ marginTop: 5 }}>
      <Text
        variant="labelSmall"
        style={{
          marginBottom: 6,
          marginLeft: 8,
          color: colors.onSurfaceVariant,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          ...commonStyle.row_start_center,
          la: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <Pressable
            key={index}
            style={{ ...commonStyle.row_space_arround_center, marginRight: 15 }}
            onPress={() => {
              const data = setStatus(values, item);
              console.log("result after ", data);
              setValues(data);
            }}
          >
            <Icon
              name={
                getStatus(values, item) == "checked"
                  ? "checkbox-marked"
                  : "checkbox-blank-outline"
              }
              size={25}
              color={colors.primary}
            />
            <Text
              variant="labelMedium"
              style={{ margin: 10, alignSelf: "baseline", fontSize: 17 }}
            >
              {item.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
const getStatus = (values, initialData) => {
  if (get(values, "length", 0) == 0) {
    return initialData.active ? "checked" : "unchecked";
  }
  const result = values.filter((item) => item.code == initialData.code);
  // console.log('value1', result)
  if (get(result, "length", 0) == 0) {
    return initialData.active ? "checked" : "unchecked";
  }
  // console.log('get status ', result[0].active)

  return result[0].active ? "checked" : "unchecked";
};
const setStatus = (selected, item) => {
  console.log(">>items:", item);
  let values = selected;
  const data = {
    code: item.code,
    description: item.description,
    active: !item.active,
  };
  if (get(values, "length", 0) == 0) {
    return [data];
  }
  const result = values.findIndex((items) => items.code == item.code);

  if (result == -1) {
    console.log("one", values);
    values = [...values, data];

    // console.log('not found ', values)
    return values;
  } else {
    values[result].active = !values[result].active;

    // console.log(' found ', values)
    return values;
  }

  return [];
};
