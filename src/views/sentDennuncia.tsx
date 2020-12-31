import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import img from "../../assets//green/Fundo.png";
// import { Container } from './styles';
export default function CreateDenuncia() {
  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }

  const route = useRoute();
  const { code } = route.params as { code: string };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.card}>
          <Text style={styles.title}>Obrigado!</Text>
          <Text style={styles.label}>Consulte sua denúncia pelo número:</Text>
          <Text style={styles.number}>{code}</Text>
          <View>
            <TouchableOpacity onPress={handleGoBack} style={styles.sendButton}>
              <AntDesign name="back" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 10,
    minWidth: "80%",
    maxWidth: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 30,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 50,
  },
  number: {
    fontFamily: "Nunito_700Bold",
    fontSize: 35,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 50,
  },
  sendButton: {
    backgroundColor: "#3e4095",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
