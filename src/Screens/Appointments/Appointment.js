import React, {
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  Image,
  Slider,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { navBar } from "../../Utilities/Style/navBar";
import { ToggleButton } from "../../Components/ToggleButton";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language/index";

const TAB_INTERACTIVE = true;
const TAB_INFORMATIVE = false;

const Appointment = ({ navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  const [isFirstSelected, setFirstSelected] = useState(TAB_INTERACTIVE);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Pressable
            style={{ ...navBar.roundIconColored, backgroundColor: "#8FA1C4" }}
          >
            <Icon name="plus" size={25} color={"#fff"} />
          </Pressable>
        </>
      ),
    });
  }, [navigation]);
  const FlatListItemTop = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: 140,
          height: 100,
          margin: 5,
          padding: 15,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.secondary,
              }}
            >
              {item.title || "No Name"}
            </Text>
          </View>
          {/*required Text to sho like amount */}

          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity
            //onPress={() => setShowIndex(index)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                // onPress={() => setShowIndex(index)}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#EFA848",
                  }}
                >
                  {strings.view_more}
                </Text>
                <Image
                  source={require("../../Assets/icons/right_arrow.png")}
                  style={{ marginLeft: 20, tintColor: "#EFA848" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            backgroundColor: "transparent",
            padding: 12,
          }}
        >
          <ToggleButton
            isFirstSelected={isFirstSelected}
            label={{
              first: strings.tab_interactive,
              second: strings.tab_informative,
            }}
            bgColor={{
              selected: color.BCAE_PRIMARY,
              unselected: color.APPOINTMENT_BACKGROUND,
            }}
            textColor={{
              selected: color.WHITE,
              unselected: color.BCAE_PRIMARY,
            }}
            textPro={{
              fontSize: fontSizes.FONT_13,
              fontWeight: "600",
              lineHeight: spacing.HEIGHT_16,
            }}
            onPressFirst={async () => {
              setFirstSelected(TAB_INTERACTIVE);
            }}
            onPressSecond={() => {
              setFirstSelected(TAB_INFORMATIVE);
            }}
          ></ToggleButton>
        </View>
        <Text
          style={{
            color: "#2B2B2B",
            fontSize: 16,
            fontWeight: "600",
            padding: 5,
            marginLeft: 10,
          }}
        >
          {strings.appointment_list}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            initialNumToRender={2}
            data={[
              { title: strings.upcoming_appointments },
              { title: strings.completed_appointments },
              { title: strings.cancelled_appointments },
            ]}
            renderItem={({ item, index }) => (
              <FlatListItemTop item={item} index={index} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});
export default Appointment;
