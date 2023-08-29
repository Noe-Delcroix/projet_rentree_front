import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Carte from './pages/Carte';
import ObjectDetail from './pages/ObjectDetail';
import Order from './pages/Order';
import Panier from './pages/Panier';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#FDF7EF' } }}>
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="SignIn"component={SignIn}/>
            <Stack.Screen name="Carte"component={Carte}/>
            <Stack.Screen name="ObjectDetail" component={ObjectDetail} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Panier" component={Panier} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;