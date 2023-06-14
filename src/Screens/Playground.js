import axios from "axios";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import { TENANT_ID } from "../Utilities/API/ApiConstants";
const { height, width } = Dimensions.get('screen');
export const Playground = () => {


  return (
    <Pressable onPress={async () => {
      console.clear()
      // uri: imageUri,
      //   type: 'image/jpeg',
      //   name: 'image.jpg',
      const formData = new FormData();

      // formData.append('file', file); // Replace 'file' with the appropriate key for your file
      formData.append('field', 'value'); // Replace 'field' and 'value' with your own data
      // Set additional headers
      const headers = {
        'Content-Type': 'multipart/form-data',
        'x-tenant-id': TENANT_ID,
      };
      // Make the API call using Axios
      axios.post('https://api.example.com/upload', formData, { headers })
        .then(response => {
          // Handle the response
          console.log(response.data);
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });

    }}>
      <Text>dfsdf</Text>
    </Pressable>
  )

};
const styles = StyleSheet.create({

});
