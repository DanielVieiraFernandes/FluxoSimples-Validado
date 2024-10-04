import { View, Text, Image } from "react-native";
import React from "react";
import { MyButton } from "../components/MyButton";
import { MyTextInput } from "../components/MyTextInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styles } from "./Styles";
import TS from "../../assets/ts.png";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/Auth";

const schema = z.object({
  nome: z.string().min(3, "Digite um nome válido"),
  email: z.string().email("Digite um email válido"),
  senha: z.string().length(6, "A senha deve conter SEIS dígitos!"),
});

export function Register() {

  const {register} = useAuth()

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",   
      email: "",
      senha: "",
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", flex: 0.2 }}
      >
        <Text>Tela de Registro</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          gap: 25,
          justifyContent: "space-around",
        }}
      >
        <View style={styles.container}>
          <Image
            source={TS}
            style={{ width: 180, height: 180, marginBottom: 25 }}
          />
          <MyTextInput placeholder="Nome" control={control} name="nome"/>
          <MyTextInput placeholder="Email" control={control} name="email" />
          <MyTextInput
            secureTextEntry
            placeholder="Senha"
            control={control}
            name="senha"
          />
           <MyButton
            title="clique para fazer Login"
            titleColor={{ color: "#000" }}
            style={{ backgroundColor: undefined }}
            onPress={() => {
              navigation.navigate('SignIn')
            }}
          />
        </View>
        <MyButton
          onPress={handleSubmit(({email,senha,nome}) => register(email,senha, nome))}
          title="Ir para o App"
        />
      </View>
    </View>       

  );
}
