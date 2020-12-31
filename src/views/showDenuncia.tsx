import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import img from "../../assets//green/Fundo.png";
import MapView from "react-native-maps";
// import { Container } from './styles';

interface ParamsCode {
  code: string;
}

export default function ShowDenuncia() {
  const navigation = useNavigation();
  const route = useRoute();
  const paramsId = route.params as ParamsCode;

  const [palying, setPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [audioUri, setAudioUri] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync().then((rs) => {
      if (rs.isPlaying) {
        setPlaying(rs.isPlaying);
        console.log("tocando");
      } else {
        setPlaying(false);
      }
    });
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setPlaying(false);
        }
      : undefined;
  }, [sound]);

  function handleGoToHome() {
    navigation.navigate("CreateDenuncia");
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Denúncia nº:</Text>
            <Text style={styles.number}>{paramsId.code}</Text>
          </View>
          <ScrollView style={styles.card}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Status: </Text>
              <Text style={styles.statusLabel}>Resolvida</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Data / Hora: </Text>
              <Text style={styles.dateLabel}>30/12/2020 - 16:45</Text>
            </View>
            <Text style={styles.label}>Imagem</Text>
            <View style={styles.imagesContainer}>
              <ScrollView horizontal pagingEnabled>
                <Image
                  style={styles.imageView}
                  source={{
                    uri:
                      "https://upload.wikimedia.org/wikipedia/commons/7/76/Hendrik_Voogd_-_Italian_landscape_with_Umbrella_Pines.jpg",
                  }}
                />
                <Image
                  style={styles.imageView}
                  source={{
                    uri:
                      "https://static.educalingo.com/img/en/800/landscape.jpg",
                  }}
                />
              </ScrollView>
            </View>
            <Text style={[styles.label, {marginTop: 20, marginBottom: 5}]}>Descrição</Text>
            <View style={styles.audioRecorderContainer}>
              <TouchableOpacity onPress={playSound}>
                <MaterialCommunityIcons
                  name="play"
                  size={40}
                  color={palying ? "#ff0019" : "#fff"}
                />
              </TouchableOpacity>
              <View
                style={palying ? styles.lineAudioPlaying : styles.lineAudioPlay}
              />
            </View>
            <Text style={styles.label}> Localização </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -6.726797023982828,
              longitude: -38.44958135713743,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            onPress={()=>{}}
          >
               {/* {position.latitude !== 0 && (
                
                <Marker
                    coordinate={{
                        latitude:position.latitude, 
                        longitude:position.longitude,
                    }}
                />)} */}
          </MapView>
        </View>
          </ScrollView>
            <Text style={styles.footer}>Esta denúncia foi resolvida?</Text>
            <View style={styles.socialBtnContainer}>
      <TouchableOpacity
              onPress={()=>{}}
              style={[styles.feedBackButton, {backgroundColor: '#3e4095',}]}
            >
              <AntDesign
                name="like1"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{}}
              style={[styles.feedBackButton, {backgroundColor: '#ed3237',}]}
            >
              <AntDesign
                name="dislike1"
                size={30}
                color="#fff"
              />
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
  content: {
    padding: 10,
    minWidth: "90%",
    maxWidth: "90%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#fff'
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 32,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
  },
  number: {
    fontFamily: "Nunito_700Bold",
    fontSize: 35,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "65%",
    maxHeight: "65%",
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Nunito_600SemiBold",
    color: "#57a983",
    fontSize: 18,
    textShadowRadius: 0.5,
    textShadowColor: "#5c5c5c",
  },
  statusLabel: {
    fontFamily: "Nunito_600SemiBold",
    color: "#3e4095",
    fontSize: 18,
    textShadowRadius: 0.5,
    textShadowColor: "#5c5c5c",
  },
  dateLabel: {
    fontFamily: "Nunito_600SemiBold",
    color: "#ed3237",
    fontSize: 18,
    textShadowRadius: 0.5,
    textShadowColor: "#5c5c5c",
  },
  imageView: {
    width: 284,
    resizeMode: "cover",
  },
  imagesContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  audioRecorderContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "#57a983",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  lineAudioRecorder: {
    backgroundColor: "#fff",
    height: 2,
    width: 180,
  },
  lineAudioPlaying: {
    backgroundColor: "#ff0019",
    height: 2,
    width: 200,
  },
  lineAudioPlay: {
    backgroundColor: "#fff",
    height: 2,
    width: 200,
  },
  mapContainer: {
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "#b3dae2",
    marginTop: 10,
    backgroundColor: "#57a983",
    marginBottom:20
  },
  map: {
    width: "100%",
    height: 150,
  },
  footer:{
    fontFamily: "Nunito_600SemiBold",
    fontSize: 24,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
    textAlign: "center",
    marginTop: 10
  },
  socialBtnContainer:{
    flexDirection: 'row',
  },
  feedBackButton:{
    paddingVertical: 15,
    paddingHorizontal:15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
  },
});
