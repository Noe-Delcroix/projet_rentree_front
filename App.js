import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Carte from './pages/Carte';
import ObjectDetail from './pages/ObjectDetail';
import Order from './pages/Order';
import Panier from './pages/Panier';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Carte"component={Carte}/>
            <Stack.Screen name="ObjectDetail" component={ObjectDetail} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Panier" component={Panier} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;