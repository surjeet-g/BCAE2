import { MASTERDATA_INIT, MASTERDATA_DATA, MASTERDATA_ERROR } from './masterDataAction'

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
                  masterdataData: action.data,
              }
          default:
              return state;
      }
  }
  export default masterDataReducer;