import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Text
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import img from '../../assets//green/Fundo.png'
// import { Container } from './styles';
export default function CreateDenuncia() {
    const navigation = useNavigation();
    function handleGoBack(){
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
       <View style={styles.card}>
       <View style={styles.searchbarContainer}>
         <TextInput style={styles.searchbarInput}></TextInput>
         <FontAwesome name="search" size={30} color="#57a983" />
       </View>
       <Text style={styles.title}>Minhas Denúncias</Text>
       <ScrollView>
          <Text style={styles.number}>20203012001</Text>
          <Text style={styles.number}>20203012001</Text>
          <Text style={styles.number}>20203012001</Text>
          <Text style={styles.number}>20203012001</Text>
          <Text style={styles.number}>20203012001</Text>
        </ScrollView>
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
    minWidth: "90%",
    maxWidth: "90%",
    maxHeight: '70%',
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#fff'
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 35,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 50,
  },
  number: {
    fontFamily: "Nunito_700Bold",
    fontSize: 30,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 30,
  },
  sendButton: {
    backgroundColor: "#3e4095",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 50,
  },
  searchbarContainer:{
    width: 300,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft:14,
    paddingRight: 30,
    borderRadius: 50,
    marginBottom: 50
  },
  searchbarInput:{
    width: "90%",
    fontFamily: "Nunito_600SemiBold",
    marginRight: 10
  },
});
