import get from "lodash.get";
import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { List, Searchbar } from "react-native-paper";
import { setUserSearch } from "../Redux/ProfileAction";
const { height, width } = Dimensions.get('screen');

/**
* Reset All params
*
*  @param {obj} navigation The obj to raise..
*  @param {func} setUserSeachEnable for handle main screen blue effect
* @param {Object} profile reference for profile reducers
*  @param {Object} dispatch1 reference for profile dispatcher
*/
export const EnableSearchForUser = (navigation, setUserSeachEnable, profile, dispatch1) => {

    enableSearchBar(navigation, setUserSeachEnable, profile, dispatch1)
    return <Text>sdfsdf</Text>
    navigation.setOptions({
        headerRight: () => {
            return (
                <View>
                    <Pressable
                        onPress={() => enableSearchBar(navigation)}
                    >
                        <Image source={require('../Assets/icons/search_user.png')} style={{ width: 60, height: 60 }} />
                    </Pressable>
                </View>
            );
        },
    });

}

/**
 * Change Header middle section
 * @param {obj} navigation The null to raise.
 */
const enableSearchBar = async (navigation, setUserSeachEnable, profile, dispatch1) => {
    // const [search, setSearch] = useState("")
    console.log('task - profile view', profile)
    navigation.setOptions({
        headerTitle: () => {
            return (
                <>
                    <Searchbar
                        style={{ width: width * 0.7 }}
                        placeholder="Search customer"
                        onChangeText={(text) => {
                            console.log('task - profile text search', text)
                            dispatch1(setUserSearch(text))
                        }}
                        value={get(profile, ' userSearchString', "")}
                    />

                    <UserSearchList />
                </>
            )
        }
    })
}

const UserSearchList = () => {
    return (
        <View style={{
            position: "absolute",
            top: 60,
            width: width * 0.9
        }}>
            <List.Item
                title={"sfdsdsd"}
                titleStyle={{
                    fontSize: 10,
                    padding: 0,
                    margin: 0,
                }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    height: 40,

                    borderBottomWidth: 0.5,
                    paddingHorizontal: 4,
                    // borderRadius: 3,
                }}
            />
        </View>
    )
}