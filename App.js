import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Carte from './src/pages/Carte';
import ObjectDetail from './src/pages/ObjectDetail';
import Order from './src/pages/OrderFinished';
import Panier from './src/pages/Panier';
import ProfileScreen from './src/pages/ProfilScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './src/components/Product';
import LogIn from './src/pages/LogIn';
import Header from './src/components/Header';
import {useState} from "react";
import { AuthContextProvider} from "./src/components/AuthContext";

import axios from 'axios';
import SeeOrder from "./src/pages/SeeOrder";
import ChangePassword from "./src/pages/ChangePassword";
import { enableScreens } from 'react-native-screens';
import store from "./store";
import { Provider } from 'react-redux'
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
});


const Stack = createNativeStackNavigator();
const linking = {
    prefixes: ['https://localhost:19006'],
    config: {
        screens: {
            LogIn: '',
            Carte: 'Carte',
            ObjectDetail: 'ObjectDetail',
            Order: 'Order',
            SeeOrder: 'SeeOrder',
            Panier: 'Panier',
            Profil: 'Profil',
            Wallet: 'Wallet',
            ChangePassword: 'ChangePassword?token=:token',
        },
    },
};
const App = () => {
    enableScreens();

    axios.defaults.withCredentials = true;

    return (

        <Provider store={store}>
            <AuthContextProvider>
                <NavigationContainer linking={linking}>
                  <Stack.Navigator
                      screenOptions={{
                          headerStyle: { backgroundColor: '#FFFFFF'},
                        }} >
                      <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{ headerTitle: (props) => <Header {...props} /> }} />

                            <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Carte" component={Carte}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="ObjectDetail" component={ObjectDetail}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Order" component={Order}  options={{ headerTitle: (props) => <Header {...props} /> }} />

                            <Stack.Screen name="SeeOrder" component={SeeOrder}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Panier" component={Panier}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                            <Stack.Screen name="Profil"  component={ProfileScreen}  options={{ headerTitle: (props) => <Header {...props} /> }} />
                        </Stack.Navigator>
                </NavigationContainer>
            </AuthContextProvider>
        </Provider>


  );
};


export default App;