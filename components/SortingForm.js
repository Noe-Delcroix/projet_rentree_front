import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SortingForm = ({ sortingMethods, sortType: defaultSortType, sortOrder: defaultSortOrder, onSortingChange }) => {
    const [sortType, setSortType] = React.useState(defaultSortType);
    const [sortOrder, setSortOrder] = React.useState(defaultSortOrder);

    useEffect(() => {
        onSortingChange({ sortType, sortOrder });
    }, [sortType, sortOrder]);

    return (
        <View>
            <Text>Sort By:</Text>
            <Picker
                selectedValue={sortType}
                onValueChange={(itemValue) => setSortType(itemValue)}
            >
                {Object.entries(sortingMethods).map(([value, label]) => (
                    <Picker.Item key={value} label={label} value={value} />
                ))}
            </Picker>

            <Text>Order:</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => setSortOrder('asc')}
                    style={{ backgroundColor: sortOrder === 'asc' ? 'blue' : 'gray', padding: 10 }}>
                    <Text style={{ color: 'white' }}>Croissant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSortOrder('desc')}
                    style={{ backgroundColor: sortOrder === 'desc' ? 'blue' : 'gray', padding: 10 }}>
                    <Text style={{ color: 'white' }}>Décroissant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SortingForm;