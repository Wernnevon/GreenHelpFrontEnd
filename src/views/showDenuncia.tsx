import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
} from "react-native";
import img from '../../assets//green/Fundo.png'
// import { Container } from './styles';
export default function ShowDenuncia() {
    const navigation = useNavigation();
    function handleNavigateToCreateDenuncia(){
        navigation.navigate('');
    }
  return (
    <View style={styles.container}>
    <ImageBackground source={img} style={styles.image}>
        <ScrollView>

        </ScrollView>
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
  },
  card: {
      
  }
});
