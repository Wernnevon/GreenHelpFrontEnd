import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import * as ImagesPicker from "expo-image-picker";
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import img from "../../assets//green/Fundo.png";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// import { Container } from './styles';
export default function CreateDenuncia() {
  const navigation = useNavigation();
  const [images, setImages] = useState<string[]>([]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  // audio ficará armazenado nessa variável
  const [recording, setRecording] = useState();

  // após a gravação o usuário poderá ouvir pelo carregamento nessa variável
  const [sound, setSound] = useState();

  // localização da uri do audio;
  const [audioUri, setAudioUri] = useState();

  // variável criada para caontrolar visualamente a cor dos botões
  const [palying, setPlaying] = useState(false);

  async function storeData (code: string) {
    try {
      await AsyncStorage.setItem(code, code)
    } catch (e) {
      console.log(e);
    }
  }
  async function getData(){
    try {
      const value = await AsyncStorage.getAllKeys()
      if(value !== null) {
       console.log(value);
       return value
      }
    } catch(e) {
      console.log(e);
    }
  }

  async function handleSaveAndNavigateToSentDenuncia(){
      await storeData('202012300003');
      navigation.navigate('SentDenuncia');

    // Lembrar de limpar os dados após salvamento
    // Lembrar de gerar o código para enviar para próxima tela;
  }
  
  function clearSound(){
        console.log('Unloading Sound');
        setAudioUri(undefined)
        setPlaying(false)
  }

  function handleNavigateToListDenuncia(){
    navigation.navigate('ListDenuncia');
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: audioUri});
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync().then(rs=>{
      if(rs.isPlaying){
        setPlaying(rs.isPlaying)
        console.log('tocando')
      } else{
        setPlaying(false)
      }
    }); 
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync(); 
        setPlaying(false)
        }
      : undefined;
  }, [sound]);

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setAudioUri(uri)
    console.log('Recording stopped and stored at', uri);
  }


  function handleSelectMapPosition(event: MapEvent){
    setPosition(event.nativeEvent.coordinate);
};

  async function handleSelectImages() {
    const { status } = await ImagesPicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("You haven't camera roll acess!");
      return;
    }
    const result = await ImagesPicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagesPicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }
    const { uri } = result;

    setImages([...images, uri]);
  }

  return (
    <ImageBackground source={img} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>Faça já sua denúncia</Text>
          <View style={styles.containerAcompanhe}>
          <Text style={styles.labelText}>
            Ja deunuciou? 
            </Text>
            <TouchableOpacity onPress={handleNavigateToListDenuncia}><Text style={styles.labelAcompanhe}>Acompanhe</Text></TouchableOpacity>
            </View>
          
        </View>
        <ScrollView style={styles.card}>
          <Text style={styles.label}> Fotos </Text>
          <TouchableOpacity
            style={styles.imageInput}
            onPress={handleSelectImages}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={50}
              color="#57a983"
            />
          </TouchableOpacity>
        {
            images.length !== 0 ? <View style={styles.imagesContainer}>
            <ScrollView horizontal pagingEnabled>
               {images.map((imageUri) => {
                 return (
                   <Image
                     key={imageUri}
                     style={styles.imageView}
                     source={{ uri: imageUri }}
                   />
                 );
               })}
             </ScrollView>
            </View> : <View/>
        }
         <Text style={styles.label}> Descrição </Text>
       {!audioUri? 
         <View  style={styles.audioRecorderContainer}>
         <TouchableOpacity
             onPress={recording ? stopRecording : startRecording}
           >
             <MaterialCommunityIcons
               name="microphone"
               size={40}
               color={recording? "#ff0019" : "#fff"}
             />
           </TouchableOpacity>
           <View style={ recording? styles.lineAudioRecording : styles.lineAudioRecorder }/>
         </View> 
      :
      <View  style={styles.audioRecorderContainer}>
      <TouchableOpacity
          onPress={playSound}
        >
          <MaterialCommunityIcons
            name="play"
            size={40}
            color={palying? "#ff0019" : "#fff"}
          />
        </TouchableOpacity>
        <View style={ palying? styles.lineAudioPlaying : styles.lineAudioPlay }/>
        <TouchableOpacity
          onPress={clearSound}
        >
          <MaterialCommunityIcons
            name="delete"
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
      </View>}
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
            onPress={handleSelectMapPosition}
          >
               {position.latitude !== 0 && (
                
                <Marker
                    coordinate={{
                        latitude:position.latitude, 
                        longitude:position.longitude,
                    }}
                />)}
          </MapView>
        </View>
        <View/>
        </ScrollView>
        <View style={ styles.buttonContainer}>
        <TouchableOpacity
              onPress={handleSaveAndNavigateToSentDenuncia}
              style={styles.sendButton}
            >
              <FontAwesome
                name="send"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.socialBtnContainer}>
      <TouchableOpacity
              onPress={()=>{}}
              style={styles.twitterButton}
            >
              <FontAwesome5
                name="twitter"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{}}
              style={styles.instaButton}
            >
              <FontAwesome5
                name="instagram"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{}}
              style={styles.faceButton}
            >
              <FontAwesome5
                name="facebook-f"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    minWidth: "80%",
    maxWidth: "80%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  labelText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    color: "#fff",
    textShadowRadius: 2,
    textShadowColor: "#5c5c5c",
  },
  labelAcompanhe: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 25,
    color: "#3e4095",
    textShadowColor: "#696865",
  },
  containerAcompanhe: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#57a983",
    borderWidth: 1.4,
    borderRadius: 0.00000001,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  imageView: {
    width: 200,
    height: 180,
    padding: 10,
    marginHorizontal: 10,
    borderColor: "#57a983",
    borderWidth: 1.4,
  },
  imagesContainer:{
      height: 200,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: "Nunito_600SemiBold",
    color: "#57a983",
    marginBottom: 8,
    fontSize: 22,
    textShadowRadius: 0.5,
    textShadowColor: "#5c5c5c",
  },
  audioRecorderContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#57a983',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  lineAudioRecorder: {
      backgroundColor: '#fff',
      height: 2,
      width: 180,
  },
  lineAudioRecording: {
    backgroundColor: "#ff0019",
    height: 2,
    width: 180,
},
lineAudioPlaying:{
  backgroundColor: '#ff0019',
  height: 2,
  width: 160,
},
lineAudioPlay:{
  backgroundColor: '#fff',
  height: 2,
  width: 160,
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
  sendButton:{
    backgroundColor: '#3e4095',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonContainer:{
    position: 'absolute',
    right: -10,
    bottom: -20,
  },
  socialBtnContainer:{
    position: 'absolute',
    flexDirection: 'row',
    bottom: 15,
  },
  twitterButton:{
    backgroundColor: '#00a9ff',
    paddingVertical: 15,
    paddingHorizontal:15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
  },
  instaButton:{
    backgroundColor: '#ffc153',
    paddingVertical: 15,
    paddingHorizontal:18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
  },
  faceButton:{
    backgroundColor: '#395196',
    paddingVertical: 15,
    paddingHorizontal:22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 5,
  },

});