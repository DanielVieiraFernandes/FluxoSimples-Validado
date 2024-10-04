import { TextInput, TextInputProps } from "react-native";
import React from "react";
import { styles } from "./Styles";
import { Controller } from "react-hook-form";
import { View, Text } from "react-native";

interface MyTextProps extends TextInputProps {
  control: string;
  name: string;
  rules: string;
}

export function MyTextInput({ control, name, rules, ...props }: MyTextProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            style={styles.txtInput}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...props}
            placeholderTextColor="#000"
          />
          {error && (
            <View>
              <Text style={{color: 'red'}}>{error.message}</Text>
            </View>
          )}
        </View>
      )}
    />
  );
}
