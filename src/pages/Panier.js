import React, {useState} from 'react';
import {View, Text, Button, FlatList, Image, CheckBox, ScrollView} from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useApplicationContext} from "../components/ApplicationContext";
import axios from "axios";
import {TextInputField, toaster} from 'evergreen-ui';

export default function Panier({ navigation, route }) {

    const { basket,  addDishesToBasket, removeDishesFromBasket, token } = useApplicationContext();

    const [address, setAddress] = useState("")

    const [detailledBasket, setDetailledBasket] = useState([])

    React.useEffect(() => {
        getDetailledBasket();
    }
    , [])

    const getQuantity = (id) => {
        const dish = basket.find((e) => e.id === id);
        if (dish) {
            return dish.quantity;
        }
        return 0;
    }

    const removeDishe = async (id, quantity = 0) => {
        console.log(quantity);
        await removeDishesFromBasket(id, quantity);
        await getDetailledBasket(); // Attendre que getDetailledBasket() soit terminée
    };

    const getDetailledBasket = async () => {
        console.log(basket);
        await setDetailledBasket([])
        // Créer un tableau de promesses pour les requêtes axios
        const axiosPromises = basket.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/dishes/' + e.id );
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Erreur lors de la requête axios :", error);
                return null;
            }
        });

        // Attendre que toutes les requêtes soient terminées avant de mettre à jour detailledBasket
        try {
            const detailledBasketData = await Promise.all(axiosPromises);
            const updatedDetailledBasket = [...detailledBasketData.filter(Boolean)]; // Filtrer les réponses nulles
            setDetailledBasket(updatedDetailledBasket);
            console.log(updatedDetailledBasket);
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'exécution des requêtes axios :", error);
        }
    }

    const launchOrder = async () => {
        const d = {
            orderContent: {},
            address: address
        }
        console.log("address" + address)

        basket.forEach(e => {
            if(e.quantity>0){
                d.orderContent[e.id]=e.quantity
            }
        })


        try {
            axios.post('http://localhost:8080/api/orders', d, ).then((response) => {
                console.log(response.data);
                toaster.success('Votre commande a bien été envoyé')
                navigation.navigate('Order')
            });
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
            toaster.warning('Une erreur est survenue')
        }
    }

    return (
        <View className="flex-1">
            <ScrollView>
                <Text>Panier</Text>
                <TextInputField
                    id="address"
                    label="A required text input field"
                    required
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Your address"
                />
                <Button
                    title="Payer"
                    onPress={() => launchOrder()}
                />

                <FlatList
                    data={detailledBasket.filter(e => getQuantity(e.id)>0)}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View>
                            <Image
                                source={{ uri: item.image }} // Assurez-vous que item.image contient l'URL de l'image
                            />
                            <View>
                                <Text>{item.name}</Text>
                                <Text>{item.price}€</Text>
                                <Text>{item.description}</Text>
                                <Button onPress={() => addDishesToBasket(item.id, 1)} title={"+"}/><Button title={"-"} onPress={() => removeDishe(item.id, 1)}/><Text onPress={() => removeDishe(item.id)}>❌</Text>
                                <Text>quantity :{getQuantity(item.id)}</Text>

                            </View>
                        </View>
                    )}
                />
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}
