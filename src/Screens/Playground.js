import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export const Playground = () => {
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const getNamea = async (num) => {
    await sleep(3000)
    return num
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        style={{ marginTop: 30, backgroundColor: "red" }}
        onPress={async () => {
          (async function () {
            for await (const num of [1, 2, 3, 4]) {
              const d = await getNamea(num)
              console.log("num :", d);
              // Expected output: 1
              if (num == 3) break; // Closes iterator, triggers return

            }
          })();
        }}
      >
        <Text>Click me</Text>
      </Pressable>



    </SafeAreaView>
  );

};
const styles = StyleSheet.create({

});
