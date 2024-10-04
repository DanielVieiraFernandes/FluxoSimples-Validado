import { View, Text, Image } from "react-native";
import React from "react";
import { MyButton } from "../components/MyButton";
import { MyTextInput } from "../components/MyTextInput";
import { styles } from "./Styles";
import TS from "../../assets/ts.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/Auth";
import { useNavigation } from "@react-navigation/native";

const schema = z.object({
  email: z.string().email("Digite um email válido"),
  senha: z.string().length(6, "A senha deve conter SEIS dígitos!"),
});

export function SignInScreen() {

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", flex: 0.2 }}
      >
        <Text>Tela de Login</Text>
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
          <MyTextInput placeholder="Email" control={control} name="email" />
          <MyTextInput
            secureTextEntry
            placeholder="Senha"
            control={control}
            name="senha"
          />
          <MyButton
            title="Não tem login? faça seu cadastro clicando aqui !"
            titleColor={{ color: "#000" }}
            style={{ backgroundColor: undefined }}
            onPress={() => {
              navigation.navigate('Register')
            }}
          />
        </View>
        <MyButton
          onPress={handleSubmit(({ email, senha }) => signIn(email, senha))}
          title="Ir para o App"
        />
      </View>
    </View>
  );
}
