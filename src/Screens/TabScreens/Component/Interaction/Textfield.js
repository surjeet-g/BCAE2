import React, { useEffect } from "react";
import { View } from "react-native";
import { ClearSpace } from '../../../../Components/ClearSpace';
import { CustomInput } from "../../../../Components/CustomInput";


export const Textfield = (props) => {
    useEffect(() => {
        console.log('here loding-----')
    }, [])
    const { fieldSetItem, formMetaAttributes, inputText, temp } = props.data
    const { handleInputChange, setTemp } = props.handlers;
    const handleInputChangeNew = (text, fieldSetItem, formMetaAttributes) => {
        setTemp(prevValues => ({
            ...prevValues,
            [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
            [fieldSetItem?.id]: text
        }));
    }
    return (< View >
        <CustomInput
            style={{
                backgroundColor: "transparent"
            }}
            onChangeText={(text) => {
                inputText.set(fieldSetItem.id, text)

                handleInputChangeNew(text, fieldSetItem, formMetaAttributes);
                // handleInputChange(text, fieldSetItem, formMetaAttributes);
                // setObj(obj => ({

                //     ...obj,
                //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                //     [fieldSetItem?.id]: text

                // }));

            }}
            value={inputText.get(fieldSetItem.id)}
            inputType={fieldSetItem.inputType}
            caption={fieldSetItem.title}
            placeHolder={fieldSetItem.placeHolder}
        />
        <ClearSpace size={2}></ClearSpace>
    </View >)

}