import React from "react";
import { View, TouchableHighlight } from "react-native";

const Button = ({ children, onClick }) => {
  return (
    <View>
      <TouchableHighlight
        onPress={onClick}
        style={{
          padding: 10,
          backgroundColor: "#616161",
          borderRadius: 4,
        }}
      >
        {children}
      </TouchableHighlight>
    </View>
  );
};

export default Button;
