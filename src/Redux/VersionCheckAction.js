export const VERSIONCHECK_INIT = "VERSIONCHECK_INIT";
export const VERSIONCHECK_DATA = "VERSIONCHECK_DATA";
export const VERSIONCHECK_ERROR = "VERSIONCHECK_ERROR";

export const initVersionCheckData = () => {
  return { type: VERSIONCHECK_INIT };
};

export const setVersionCheckData = (data) => {
  return { type: VERSIONCHECK_DATA, data };
};

export const setVersionCheckError = (data) => {
  return { type: VERSIONCHECK_ERROR, data };
};
