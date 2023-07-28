import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export const Counter = () => {
    return (
        <View>
            <Text>Counter {counter}</Text>
            <Button onPress={() => {

            }}>
                Increment</Button>
        </View>
    )
}   