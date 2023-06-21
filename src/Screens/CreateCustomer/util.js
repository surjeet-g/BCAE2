
import axios from "axios";
import Toast from "react-native-toast-message";
import { serverCall } from "../../Utilities/API";
import { BASE_URL, TENANT_ID } from "../../Utilities/API/ApiConstants";

export const APICallForMuti = async (url, formData, errorMsg = "") => {

    const headers = {
        'Content-Type': 'multipart/form-data',
        'x-tenant-id': TENANT_ID,
    };

    let status = false
    let res;
    try {
        res = await axios.post(BASE_URL + url, formData, { headers })
        console.log("resonp", res)
        status = true
    }
    catch (err) {
        console.log("err", err)
        status = false
    }

    if (status) {

        return { status: true, response: res }
    }
    else {
        if (errorMsg != "") {
            Toast.show({
                type: "bctError",
                text1: errorMsg || "Face not verified",
            });
        }
        //todo 

        return { status: false, response: res }
    }
}


export const APICall = async (url, method = "get", formData, errorMsg = "") => {

    const apiCall = await serverCall(
        url,
        method,
        formData
    );
    console.log("response", apiCall)
    if (apiCall.success) {
        console.log("response", apiCall.data)
        return { status: true, response: apiCall.data }
    }
    else {
        if (errorMsg != "") {
            Toast.show({
                type: "bctError",
                text1: errorMsg || "Face not verified",
            });
        }
        //todo 

        return { status: false, response: apiCall.data }
    }
}