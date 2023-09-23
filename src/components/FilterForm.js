import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import axios from "axios";
import {Checkbox} from "evergreen-ui";
import SortingForm from "./SortingForm";

const FilterForm = ({ onQueryChange, tags, diets, sortingMethods, sortOrder: defaultSortOrder }) => {
    const [search, setSearch] = useState('');
    const [prices, setPrices] = useState([0, 100])
    const [selectedTags, setSelectedTags] = useState({});
    const [selectedDiets, setSelectedDiets] = useState({});
    const [selectAllTags, setSelectAllTags] = useState(false);
    const [selectAllDiets, setSelectAllDiets] = useState(false);
    const [sortType, setSortType] = useState(Object.keys(sortingMethods)[0]);  // Default to the first sorting type
    const [sortingOrders, setSortingOrders] = useState(defaultSortOrder || 'asc'); // Default to ascending

    const handleCheckboxChange = (type, key, checked) => {
        if (type === "tags") {
            setSelectedTags(prev => ({ ...prev, [key]: checked }));
        } else {
            setSelectedDiets(prev => ({ ...prev, [key]: checked }));
        }
    };

    const handleSelectAll = (type, checked) => {
        if (type === "tags") {
            const newSelectedTags = {};
            Object.keys(tags).forEach(tag => {
                newSelectedTags[tag] = checked;
            });
            setSelectedTags(newSelectedTags);
            setSelectAllTags(checked);
        } else {
            const newSelectedDiets = {};
            Object.keys(diets).forEach(diet => {
                newSelectedDiets[diet] = checked;
            });
            setSelectedDiets(newSelectedDiets);
            setSelectAllDiets(checked);
        }
    };

    const handleSortingChange = ({ sortType, sortOrder }) => {
        setSortType(sortType);
        setSortingOrders(sortOrder);
    };

    useEffect(() => {
        handleQueryChange();
    }, [search, selectedTags, selectedDiets, sortType, sortingOrders]);

    const handleQueryChange = () => {
        const query = {
            search: search,
            lowerPrice: prices[0],
            upperPrice: prices[1],
            tags: Object.keys(selectedTags).filter(tag => selectedTags[tag]).join(','),
            diets: Object.keys(selectedDiets).filter(diet => selectedDiets[diet]).join(','),
            sortBy: sortType,
            sortOrder: sortingOrders
        };
        onQueryChange(query);
    };


    return (
        <div>
            <Text>Rechercher un plat</Text>
            <TextInput
                placeholder="Nom du plat..."
                value={search}
                onChangeText={setSearch}
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

            <Text>Diets</Text>
            <div>
                <Checkbox
                    label="Select All Diets"
                    checked={selectAllDiets}
                    onChange={(e) => handleSelectAll("diets", e.target.checked)}
                />
                {Object.entries(diets).map((diet) => (
                    <Checkbox
                        key={diet[0]}
                        label={diet[1]}
                        checked={selectedDiets[diet[0]] || false}
                        onChange={(e) => handleCheckboxChange("diets", diet[0], e.target.checked)}
                    />
                ))}
            </div>

            <Text>Tags</Text>

            <div>
                <Checkbox
                    label="Select All Tags"
                    checked={selectAllTags}
                    onChange={(e) => handleSelectAll("tags", e.target.checked)}
                />
                {Object.entries(tags).map((tag) => (
                    <Checkbox
                        key={tag[0]}
                        label={tag[1]}
                        checked={selectedTags[tag[0]] || false}
                        onChange={(e) => handleCheckboxChange("tags", tag[0], e.target.checked)}
                    />
                ))}
            </div>


            <SortingForm
                sortingMethods={sortingMethods}
                sortType={sortType}
                sortOrder={sortingOrders}
                onSortingChange={handleSortingChange}
            />

        </div>
    );
};

export default FilterForm;



