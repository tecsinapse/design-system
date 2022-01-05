import { Dimensions, Platform, StatusBar } from "react-native";
import { extractNumbersFromString } from "./extractNumbersFromString";
import { isIphoneX } from "./reactNativeIphoneXHelper";

const STANDARD_SCREEN_HEIGHT = 640

export const RFPercentage = (percent: number) => {
    if (Platform.OS === 'web') return percent
    const { height, width } = Dimensions.get("window");
    const standardLength = width > height ? width : height;
    const offset = width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight || 0 // iPhone X style SafeAreaView size in portrait
    const deviceHeight = isIphoneX() || Platform.OS === "android" ? standardLength - offset : standardLength;
    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
}

export const RFValue = (fontSize: number, standardScreenHeight: number = STANDARD_SCREEN_HEIGHT) => {
    if (Platform.OS === 'web') return fontSize
    const { height, width } = Dimensions.get("window");
    const standardLength = width > height ? width : height;
    const offset = width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight || 0 // iPhone X style SafeAreaView size in portrait
    const deviceHeight = isIphoneX() || Platform.OS === "android" ? standardLength - offset : standardLength;
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
}

export const RFValueStr = (fontSize: string, standardScreenHeight?: number) => {
    const _fontSize = extractNumbersFromString(fontSize)
    const out = `${RFValue(_fontSize, standardScreenHeight)}px`
    console.log("in/out:", fontSize, out)
    return out
}