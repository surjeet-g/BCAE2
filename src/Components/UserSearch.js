import get from "lodash.get";
import React from "react";
import { Dimensions, FlatList, Image, Pressable, Text, View } from "react-native";
import { List, Searchbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { setSearchProfileReset, setUserSearch } from "../Redux/ProfileAction";
import { fetchSavedProfileDataByUser, seachCustomers } from "../Redux/ProfileDispatcher";

const { height, width } = Dimensions.get('screen');

/**
* Reset All params
*
*  @param {obj} navigation The obj to raise..
*  @param {func} setUserSeachEnable for handle main screen blue effect
* @param {boolean} loader reference for loader
*/
export const EnableSearchForUser = ({ navigation, setUserSeachEnable, loader = false, setLoader = () => { }, headerRightForNav = null, headerTitleForNav = "" }) => {
    const profileDispatch = useDispatch([seachCustomers, setUserSearch, setSearchProfileReset, fetchSavedProfileDataByUser]);
    const profileReducer = useSelector(
        (state) => state.profile
    );
    enableSearchBar(navigation, setUserSeachEnable,
        profileReducer,
        profileDispatch, loader, setLoader,
        headerRightForNav, headerTitleForNav)

    return navigation.setOptions({
        headerRight: () => {
            return (
                <View>
                    <Pressable
                        onPress={() => {
                            // enableSearchBar(navigation, setUserSeachEnable,
                            //     profileReducer,
                            //     profileDispatch, loader, setLoader,
                            //     headerRightForNav, headerTitleForNav)
                        }}
                    >
                        <Image source={require('../Assets/icons/search_user.png')} style={{ width: 60, height: 60 }} />
                    </Pressable>
                </View>
            );
        },
    });
    return null
}

/**
 * Change Header middle section
 * @param {obj} navigation The null to raise.
 */



const enableSearchBar = async (navigation, setUserSeachEnable,
    profile, dispatch1, loader, setLoader,
    headerRightForNav, headerTitleForNav) => {

    // const [search, setSearch] = useState("")


    console.log('task - profile view', profile)

    const renderResult = () => {
        const profileSearchResult = get(profile, 'profileSearchData', [])
        console.log('task - profil inside result ', profileSearchResult, profile)
        return (<UserSearchList
            headerTitleForNav={headerTitleForNav}
            profileSearchResult={profileSearchResult}
            dispatch1={dispatch1}
            navigation={navigation}
            setLoader={setLoader}
            headerRightForNav={headerRightForNav}
            setUserSeachEnable={setUserSeachEnable}
        />)
    }
    // const renderResult = useMemo(() => {
    //     const profileSearchResult = get(profile, 'profileSearchData', [])
    //     console.log('task - profil inside result ', profileSearchResult, profile)
    //     return (<UserSearchList
    //         headerTitleForNav={headerTitleForNav}
    //         profileSearchResult={profileSearchResult}
    //         dispatch1={dispatch1}
    //         navigation={navigation}
    //         setLoader={setLoader}
    //         headerRightForNav={headerRightForNav}
    //         setUserSeachEnable={setUserSeachEnable}
    //     />)
    // }, [headerTitleForNav, profileSearchResult, navigation, setLoader, headerRightForNav, setUserSeachEnable])


    navigation.setOptions({
        headerTitle: () => {
            return (
                <>
                    <Searchbar
                        style={{ width: width * 0.7 }}
                        placeholder="Search customer"
                        onChangeText={async (text) => {
                            console.log('task - profile text search', text)
                            setLoader(true)
                            await dispatch1(setUserSearch(text))
                            await dispatch1(seachCustomers())
                            setLoader(false)
                        }}

                        value={get(profile, 'userSearchString', "")}
                    />
                    {renderResult()}

                </>
            )
        }
    })
    navigation.setOptions({
        headerRight: () => {
            return (
                <Icon
                    onPress={() => {
                        dispatch1(setSearchProfileReset())
                    }} name='close-circle' size={25} color={"#000"} />
            )
        }
    })
}

const UserSearchList = ({ setLoader, headerTitleForNav, setUserSeachEnable,
    profileSearchResult, dispatch1, navigation, headerRightForNav }) => {
    return (
        <View style={{
            top: 60,
            position: "absolute",
            width: width * 0.9
        }}>
            {profileSearchResult.length == 0 ?
                <Text></Text> :
                <FlatList
                    contentContainerStyle={{
                        height: 500
                    }}
                    data={profileSearchResult}
                    renderItem={({ item }) => {
                        return (
                            <List.Item
                                title={`${item.firstName} ${item.lastName}`}
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
                                onPress={async () => {
                                    console.log('>>nav', navigation)
                                    setLoader(true)
                                    const status = await dispatch1(fetchSavedProfileDataByUser("ce2b267e-4fb3-4c6d-b3b1-9ea52280ab9d"))
                                    // if (status) {
                                    navigation.setOptions({
                                        headerRight: headerRightForNav,
                                        headerTitle: "sdfsdf"
                                    })

                                    // }
                                    setLoader(false)
                                    // setUserSeachEnable(false)
                                }}
                            />
                        )

                    }}
                />
            }
        </View>
    )
}