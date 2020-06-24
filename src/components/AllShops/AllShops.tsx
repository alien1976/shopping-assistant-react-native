import * as React from 'react';
import ShopCard from '../Shops/ShopCard';
import { useSelector } from 'react-redux';
import { selectShops } from '../../redux/shopsReducer';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const AllShops = () => {
    const [query, setQuery] = React.useState('');
    const shops = useSelector(selectShops);
    const shopBrands = useSelector(selectShopBrands);
    const [currentShopBrand, setCurrentShopBrand] = React.useState('all');
    const [filteredShops, setFilteredShops] = React.useState([]);
    const selectInputRef = React.useRef(null);

    React.useEffect(() => {
        setFilteredShops(shops)
    }, [shops])

    React.useEffect(() => {
        filterShops();
    }, [currentShopBrand, query])

    const filterShops = () => {
        const shopBrandShops = currentShopBrand === 'all' ? 'all' : shopBrands.find((el) => el.id === currentShopBrand).shopsIds;

        const newShops = shops.filter((el) => {
            return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
                (shopBrandShops === 'all' || shopBrandShops.indexOf(el.id) !== -1)
        })

        setFilteredShops(newShops);
    }

    const onSearchQuery = (query) => {
        setQuery(query)
    }

    const placeholder = {
        label: 'All',
        value: 'all',
        color: '#000000',
    };

    return (
        <View>
            <SafeAreaView style={{
                marginTop: 5,
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }} >
                <Searchbar
                    style={{ margin: 10 }}
                    placeholder="Search"
                    onChangeText={onSearchQuery}
                    value={query}
                />
                <RNPickerSelect
                    placeholder={placeholder}
                    items={shopBrands.map((el) => {
                        return { label: el.name, value: el.id }
                    })}
                    onValueChange={value => {
                        setCurrentShopBrand(value)
                    }}
                    value={currentShopBrand}
                    ref={el => {
                        selectInputRef.current = el;
                    }}
                />
                <FlatList style={{ width: '100%' }}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    data={filteredShops}
                    renderItem={({ item }) => <ShopCard key={item.id} shopId={item.id} shopBrandId={item.shopBrandId} address={item.address} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View >
    )
}

export default AllShops;