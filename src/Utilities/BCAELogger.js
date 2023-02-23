let isDebug = true;

export const entryLog = (methodName, data) => {
  if (isDebug) {
    console.debug(
      `Entered into method ${methodName}() with arguments ${JSON.stringy(data)}`
    );
  }
};

export const exitLog = (methodName, data) => {
  if (isDebug) {
    console.debug(
      `Exitting from method ${methodName}() with arguments ${JSON.stringy(
        data
      )}`
    );
  }
};
