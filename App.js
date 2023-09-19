import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Carte from './pages/Carte';
import ObjectDetail from './pages/ObjectDetail';
import Order from './pages/OrderFinished';
import Panier from './pages/Panier';
import ProfileScreen from './pages/ProfilScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './components/Product';
import LogIn from './pages/LogIn';
import Header from './components/Header';
import {useState} from "react";
import WalletScreen from "./pages/WalletScreen";
import {ApplicationContextProvider} from "./components/ApplicationContext";
import axios from 'axios';
import SeeOrder from "./pages/SeeOrder";

const Stack = createNativeStackNavigator();

const App = () => {

    axios.defaults.withCredentials = true;

    return (
      <ApplicationContextProvider>
          <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{ headerStyle: { backgroundColor: '#FDF7EF' } }}>
                  <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="Carte" component={Carte}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="ObjectDetail" component={ObjectDetail}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="Order" component={Order}  options={{ headerTitle: (props) => <Header {...props} /> }} />

                  <Stack.Screen name="SeeOrder" component={SeeOrder}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="Panier" component={Panier}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="Profil"  component={ProfileScreen}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                  <Stack.Screen name="Wallet"  component={WalletScreen}  options={{ headerTitle: (props) => <Header {...props} /> }} />
              </Stack.Navigator>
          </NavigationContainer>
      </ApplicationContextProvider>

  );
};

export default App;