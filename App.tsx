import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const paperTheme = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors, primary: '#e84d62', background: '#101116', surface: '#20212a' },
};
const navigationTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: '#e84d62', background: '#101116', card: '#181922' },
};

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#181922' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#101116' },
        }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Catálogo de Filmes' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Filme' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
