import { MASTERDATA_DATA, MASTERDATA_ERROR, MASTERDATA_INIT } from './masterDataAction'

const masterdataInitialState = {
    initmasterData: false,
    ismasterDataError: false,
    masterdataData: {},
}

const masterDataReducer = (state = masterdataInitialState, action) => {
    switch (action.type) {
        case MASTERDATA_INIT:
            return {
                ...state,
                initmasterData: true,
                ismasterDataError: false,
                masterdataData: {},
            }

        case MASTERDATA_ERROR:
            return {
                ...state,
                initmasterData: false,
                ismasterDataError: true,
                masterdataData: action.data,
            }

        case MASTERDATA_DATA:
            return {
                ...state,
                initmasterData: false,
                ismasterDataError: false,
                masterdataData: { ...state.masterdataData, ...action.data },
            }
        default:
            return state;
    }
}
export default masterDataReducer;