import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { CustomDropDownFullWidth } from "../Components/CustomDropDownFullWidth";
import { FooterModel } from "../Components/FooterModel";
// import { Success } from "../Components/InteractionSuccess";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
export const Playground = () => {

  return (
    <FooterModel
      open={true}
      setOpen={() => { }}
      title={`Enter address details`}
    >


      <CustomDropDownFullWidth
        setDropDownEnable={() => { }}
        isDisable={true}
        selectedValue={"dfdsf"}
        setValue={() => { }}
        data={
          [
            { code: "sdfsf", description: "sdfsdf" },
            { code: "sdfsf", description: "sdfsdf" },

            { code: "sdfsf", description: "sdfsdf" },

            { code: "sdfsf", description: "sdfsdf" },

            { code: "sdfsf", description: "sdfsdf" },

            { code: "sdfsf", description: "sdfsdf" },


            { code: "sdfsf", description: "sdfsdf" },

          ]
          // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
        }
        onChangeText={(text) => {



        }}
        value={"dfdsf"}
        isDisableDropDown={true}
        placeHolder={"asdadd*"}
        caption={"asdasdsd*"}

      />

      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>
      <Text>sdfsdf</Text>


    </FooterModel>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 200,
    backgroundColor: "yellow"
  },
  dropDownCard: {
    // shadowColor: '#171717',
    maxHeight: 50 * 5,
    paddingTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "white",
    borderRadius: 6,
    width: "100%",
    marginVertical: 6,
    elevation: 3,
  },
});
