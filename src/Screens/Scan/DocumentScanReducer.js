import { SCAN_INIT, SCAN_DATA, SCAN_ERROR } from "./DocumentScanAction";

const scanInitialState = {
  initScan: false,
  isScanError: false,
  scanData: {},
};

const DocumentScanReducer = (state = scanInitialState, action) => {
  switch (action.type) {
    case SCAN_INIT:
      return {
        ...state,
        initScan: true,
        isScanError: false,
        scanData: {},
      };

    case SCAN_ERROR:
      return {
        ...state,
        initScan: false,
        isScanError: true,
        scanData: action.data,
      };

    case SCAN_DATA:
      return {
        ...state,
        initScan: false,
        isScanError: false,
        scanData: action.data,
      };
    default:
      return state;
  }
};
export default DocumentScanReducer;
