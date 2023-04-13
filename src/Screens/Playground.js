import React, { useCallback } from "react";
import {
  Button,
  Linking, SafeAreaView, StyleSheet, Text, View
} from "react-native";
const supportedURL = "slack://open?team=123456";
const unsupportedURL = "tel: +123456789";
const OpenURLButton = ({ url, children }) => {
  const handlePress
    = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }, [url]);
  return <Button
    title={children}
    onPress={handlePress}
    color="#922ce6" />;
};
export const Playground = () => {
  const Separator = () => (
    <View style={styles.separator} />
  );
  return (
    <SafeAreaView style={styles.container}>


      <View>
        <Text>Skype</Text>
        <OpenURLButton url={`skype://chat`}>Video</OpenURLButton>
        <Separator />
        <OpenURLButton url={`slack://open?team=123456`}>Audio call</OpenURLButton>
      </View>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1
    , justifyContent: "center"
    , alignItems: "center"
    , backgroundColor: "#faed75"
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
  },
  separator: {
    marginVertical: 4,
    borderBottomColor: '#d94e9a',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
