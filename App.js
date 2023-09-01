import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Carte from './pages/Carte';
import ObjectDetail from './pages/ObjectDetail';
import Order from './pages/Order';
import Panier from './pages/Panier';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from './components/Product';
import LogIn from './pages/LogIn';
import Header from './components/Header';
import {useState} from "react";

const Stack = createNativeStackNavigator();

const App = () => {

    const [token, setToken] = useState("")


  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#FDF7EF' } }}>
            <Stack.Screen name="LogIn" component={props => <LogIn setToken={setToken} {...props}/>} options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Carte" component={props => <Carte token={token} {...props}/>}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="ObjectDetail" component={props => <ObjectDetail token={token} {...props}/>}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Order" component={props => <Order token={token} {...props}/>}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Panier" component={props => <Panier token={token} {...props}/>}  options={{ headerTitle: (props) => <Header {...props} /> }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;