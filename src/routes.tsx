import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateDenuncia from "./views/createDenuncia";
import SentDenuncia from "./views/sentDennuncia";
import ListDenuncia from "./views/listDenuncias";
// import { Container } from './styles';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
        <Screen
          options={{
            headerShown: false
          }}
          name="CreateDenuncia"
          component={CreateDenuncia}
        />
        <Screen
          options={{
            headerShown: false
          }}
          name="SentDenuncia"
          component={SentDenuncia}
        />
        <Screen
          options={{
            headerShown: false
          }}
          name="ListDenuncia"
          component={ListDenuncia}
        />
      </Navigator>
    </NavigationContainer>
  );
}