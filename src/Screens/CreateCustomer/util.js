
import axios from "axios";
import Toast from "react-native-toast-message";
import { BASE_URL, TENANT_ID } from "../../Utilities/API/ApiConstants";

export const APICallForMuti = async (url, formData, errorMsg = "") => {
    console.log("point 2",)
    const headers = {
        'Content-Type': 'multipart/form-data',
        'x-tenant-id': TENANT_ID,
    };
    console.log("point 1",)
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