import {
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle
} from "react-native";
import React from "react";
import { styles } from "./Styles";

interface MyButton extends TouchableOpacityProps {
  title: string;
  titleColor: StyleProp<TextStyle>;
}

export function MyButton({style, title, titleColor, ...rest}: MyButton) {
  return (
    <TouchableOpacity style={[styles.btt, style]} {...rest}>
      <Text style={[{color: '#fff'}, titleColor]}>{title}</Text>
    </TouchableOpacity>
  );
}
