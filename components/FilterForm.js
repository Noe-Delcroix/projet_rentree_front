import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import axios from "axios";
import {Checkbox} from "evergreen-ui";

const FilterForm = ({ onQueryChange, tags, diets }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [prices, setPrices] = useState([0, 100])
    const [selectedTags, setSelectedTags] = useState({});
    const [selectedDiets, setSelectedDiets] = useState({});

    const handleCheckboxChange = (type, key, checked) => {
        if (type === "tags") {
            setSelectedTags(prev => ({ ...prev, [key]: checked }));
        } else {
            setSelectedDiets(prev => ({ ...prev, [key]: checked }));
        }
    };

    useEffect(() => {
        handleQueryChange();
    }, [searchQuery, selectedTags, selectedDiets]);

    const handleQueryChange = () => {
        const query = {
            searchText: searchQuery,
            // lowerPrice: prices[0],
            // upperPrice: prices[1],
            // tags: Object.keys(selectedTags).filter(tag => selectedTags[tag]),
            // diets: Object.keys(selectedDiets).filter(diet => selectedDiets[diet])
        };
        onQueryChange(query);
    };


    return (
        <div>
            <Text>Rechercher un plat</Text>
            <TextInput
                placeholder="Nom du plat..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />


            <Text>Prix Minimum: {prices[0].toFixed(2)} €</Text>
            <Text>Prix Maximum: {prices[1].toFixed(2)} €</Text>

            <RangeSlider
                min={0}
                max={100}
                step={1}
                value={prices}
                onInput={setPrices}
                onThumbDragEnd={handleQueryChange}

            />

            <Text>Tags</Text>
            <ScrollView>
                {Object.entries(tags).map((tag) => (
                    <Checkbox
                        key={tag[0]}
                        label={tag[1]}
                        checked={selectedTags[tag[0]] || false}
                        onChange={(e) => handleCheckboxChange("tags", tag[0], e.target.checked)}
                    />
                ))}
            </ScrollView>

            <Text>Diets</Text>
            <ScrollView>

                {Object.entries(diets).map((diet) => (
                    <Checkbox
                        key={diet[0]}
                        label={diet[1]}
                        checked={selectedDiets[diet[0]] || false}
                        onChange={(e) => handleCheckboxChange("diets", diet[0], e.target.checked)}
                    />
                ))}
            </ScrollView>


        </div>
    );
};

export default FilterForm;



