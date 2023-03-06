export const SCAN_INIT = "SCAN_INIT";
export const SCAN_DATA = "SCAN_DATA";
export const SCAN_ERROR = "SCAN_ERROR";

export function initScanData() {
  return { type: SCAN_INIT };
}

export function setScanData(data) {
  return { type: SCAN_DATA, data };
}

export function setScanError(data) {
  return { type: SCAN_ERROR, data };
}
