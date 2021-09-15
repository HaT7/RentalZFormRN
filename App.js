import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import InformationFormScreen from "./src/features/InformationForm/screens/informationForm.screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/features/Home/screens/HomeScreen";
import ViewAll from "./src/features/ViewAll/screens/ViewAll";

const Stack = createStackNavigator();

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: "Home",
                headerStyle: {
                  backgroundColor: "#2992C4",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="InformationFormScreen"
              component={InformationFormScreen}
              options={{
                title: "Insert Information",
                headerStyle: {
                  backgroundColor: "#2992C4",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="ViewAll"
              component={ViewAll}
              options={{
                title: "ViewAll",
                headerStyle: {
                  backgroundColor: "#2992C4",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
      <ExpoStatusBar style="auto" />
    </>
  );
}
