import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';

import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';

const FilterForm = ({ onSearchQueryChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [diets, setDiets] = useState({
        vegetarian: false,
        vegan: false,
        glutenFree: false,
    });
    const [tags, setTags] = useState({
        healthy: false,
        quick: false,
        italian: false,
        mexican: false,
    });


    const handleDietChange = (diet) => {
        setDiets((prevDiets) => ({
            ...prevDiets,
            [diet]: !prevDiets[diet],
        }));
    };

    const handleTagChange = (tag) => {
        setTags((prevTags) => ({
            ...prevTags,
            [tag]: !prevTags[tag],
        }));
    };

    const handleToggleAllDiets = () => {
        const allChecked = Object.values(diets).every((value) => value);
        const newDietsState = {};
        for (const diet in diets) {
            newDietsState[diet] = !allChecked;
        }
        setDiets(newDietsState);
    };

    const handleToggleAllTags = () => {
        const allChecked = Object.values(tags).every((value) => value);
        const newTagsState = {};
        for (const tag in tags) {
            newTagsState[tag] = !allChecked;
        }
        setTags(newTagsState);
    };

    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
        onSearchQueryChange(query); // Invoke the callback with the new query
    };

    return (
        <ScrollView>
            <Text>Search</Text>
            <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearchQueryChange}
            />

            {/*<Text>Price Range</Text>*/}

            {/*<Slider*/}
            {/*    minimumValue={0}*/}
            {/*    maximumValue={200}*/}
            {/*    value={minPrice}*/}
            {/*    onValueChange={(value) => setMinPrice(value)}*/}
            {/*/>*/}
            {/*<Slider*/}
            {/*    minimumValue={0}*/}
            {/*    maximumValue={200}*/}
            {/*    value={maxPrice}*/}
            {/*    onValueChange={(value) => setMaxPrice(value)}*/}
            {/*/>*/}
            {/*<Text>Min Price: ${minPrice}</Text>*/}
            {/*<Text>Max Price: ${maxPrice}</Text>*/}

            {/*<Text>Diets</Text>*/}
            {/*{Object.entries(diets).map(([diet, checked]) => (*/}
            {/*    <View key={diet}>*/}
            {/*        <CheckBox*/}
            {/*            value={checked}*/}
            {/*            onValueChange={() => handleDietChange(diet)}*/}
            {/*        />*/}
            {/*        <Text>{diet}</Text>*/}
            {/*    </View>*/}
            {/*))}*/}
            {/*<Button title="Toggle All Diets" onPress={handleToggleAllDiets} />*/}

            {/*<Text>Tags</Text>*/}
            {/*{Object.entries(tags).map(([tag, checked]) => (*/}
            {/*    <View key={tag}>*/}
            {/*        <CheckBox*/}
            {/*            value={checked}*/}
            {/*            onValueChange={() => handleTagChange(tag)}*/}
            {/*        />*/}
            {/*        <Text>{tag}</Text>*/}
            {/*    </View>*/}
            {/*))}*/}
            {/*<Button title="Toggle All Tags" onPress={handleToggleAllTags} />*/}
        </ScrollView>
    );
};

export default FilterForm;



