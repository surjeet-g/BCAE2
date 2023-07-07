export const MASTERDATA_INIT = 'MASTERDATA_INIT';
export const MASTERDATA_DATA = 'MASTERDATA_DATA';
export const MASTERDATA_ERROR = 'MASTERDATA_ERROR';
export const MASTERDATA_CONFIG_DATA = 'MASTERDATA_CONFIG_DATA';


export function initmasterDataData() {
    return { type: MASTERDATA_INIT, }
}

export function setmasterDataData(data) {
    return { type: MASTERDATA_DATA, data }
}

export function setmasterDataError(data) {
    return { type: MASTERDATA_ERROR, data }
}

export function setmasterDataConfig(data) {
    return { type: MASTERDATA_CONFIG_DATA, data }
}




