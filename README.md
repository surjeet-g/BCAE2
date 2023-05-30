# BCAE2.0d

## Repo url:

https://github.com/surjeet-g/BCAE2

## Changes to be done inside node_modules:

1. Open `build.gradle` file inside `react-native-reanimated` package and replace the if condition with this below if condition.

```
if (REACT_NATIVE_MINOR_VERSION >= 71 && appProject?.ext?.react?.enableHermes?.toBoolean()) {
       return "hermes"
   }
```
