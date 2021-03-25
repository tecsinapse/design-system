import React from "react";
import { Text as RNText } from "react-native";

const Text = ({ children }) => {
  return <RNText style={{ color: "#fff" }}>{children}</RNText>;
};

export default Text;
