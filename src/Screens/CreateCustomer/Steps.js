export const FACE_RECOG_GET_START = -7
export const FACE_RECOG_IM_READY = -6
export const FACE_RECOG_TAKE_SELFI = -5
export const FACE_RECOG_UPLOAD_SELFI = -4
export const FACE_RECOG_UPLOAD_SELFI_SUCCESS = -3
export const FACE_RECOG_UPLOAD_DOCUS = -2
export const FACE_RECOG_UPLOAD_DOCUS_SUCCESS = -1
export const FACE_RECOG_UPLOAD_DOCUS_LOADER = -9

export const STEP_CUSTOMER_FORM = 1
export const STEP_CUSTOMER_ADDRESS = 2
export const STEP_SERVICE_LIST = 3
export const STEP_SERVICE_2_SHOW_SELECTED = 4
export const STEP_AGREE = 9
export const STEP_ACK_SUCCESS = 11
export const STEP_ACK_ERROR = 12


export const handleBackNavHandle = (step) => {
    switch (step) {
        case STEP_AGREE:
            return STEP_SERVICE_2_SHOW_SELECTED
        case STEP_SERVICE_2_SHOW_SELECTED:
            return STEP_AGREE
        default:
            return 0
    }
}

export const handleNextHandle = (step) => {
    switch (step) {
        case STEP_SERVICE_2_SHOW_SELECTED:
            return STEP_AGREE
        default:
            return 0
    }
}

// export const FACE_RECOG_UPLOAD_DOCUS_SUCCESS = -1
// export const FACE_RECOG_UPLOAD_DOCUS_SUCCESS = -1
// export const FACE_RECOG_UPLOAD_DOCUS_SUCCESS = -1






