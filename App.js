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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#FDF7EF' } }}>
            <Stack.Screen name="LogIn" component={LogIn} options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Carte"component={Carte}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="ObjectDetail" component={ObjectDetail}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Order" component={Order}  options={{ headerTitle: (props) => <Header {...props} /> }} />
            <Stack.Screen name="Panier" component={Panier}  options={{ headerTitle: (props) => <Header {...props} /> }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;