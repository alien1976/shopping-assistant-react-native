import * as React from 'react';
import { IProduct } from '../../globals/interfaces';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { SafeAreaView, FlatList, View } from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const DisplayProducts = ({ products }) => {
    const [query, setQuery] = React.useState('');
    const [searchByValue, setSearchByValue] = React.useState('newest');
    const [currentShopBrand, setCurrentShopBrand] = React.useState('all');
    const shopBrands = useSelector(selectShopBrands);
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    React.useEffect(() => {
        if (!products || !products.length) return;

        setFilteredProducts(products)
    }, [products])

    React.useEffect(() => {
        filterProducts();
    }, [query, products, currentShopBrand, searchByValue])

    const filterProducts = () => {
        const shopBrandProducts = currentShopBrand === 'all' ? 'all' : shopBrands.find((el) => el.id === currentShopBrand).productsIds;

        const newProducts = products.filter((el) => {
            return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
                (shopBrandProducts === 'all' || shopBrandProducts.indexOf(el.id) !== -1)
        })

        sortProducts(newProducts);
        setFilteredProducts(newProducts);
    }

    const sortProducts = (products: IProduct[]) => {
        switch (searchByValue) {
            case 'low-high': {
                products.sort((a: IProduct, b: IProduct) => {
                    return a.price - b.price
                })
                break;
            }
            case 'high-low': {
                products.sort((a: IProduct, b: IProduct) => {
                    return b.price - a.price
                })
                break;
            }
            case 'newest': break;
            default: break;
        }
    }

    const onSearchQuery = (query) => {
        setQuery(query)
    }

    const placeholder = {
        label: 'Select shop brand',
        value: currentShopBrand,
        color: 'gray',
    };

    const mediaLoaded = !!products && !!filteredProducts;

    if (!mediaLoaded) return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} size='large' />
        </View>
    )

    return (
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
                placeholder={{
                    label: 'Filter products by price',
                    value: searchByValue,
                    color: 'gray',
                }}
                items={[
                    { label: 'Newest products', value: 'newest' },
                    { label: 'Price: Low-High', value: 'low-high' },
                    { label: 'Price: High-Low', value: 'high-low' },
                ]}
                onValueChange={value => { setSearchByValue(value); }}
                value={searchByValue}
            />
            <RNPickerSelect
                placeholder={placeholder}
                items={[{ label: 'All shop brands', value: 'all' }, ...shopBrands.map((el) => {
                    return { label: el.name, value: el.id }
                })]}
                onValueChange={value => { setCurrentShopBrand(value); }}
                value={currentShopBrand}
            />
            <FlatList style={{ width: '100%' }}
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                ListHeaderComponent={!mediaLoaded ? <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator animating={true} size='large' />
                </View> : null}
                data={filteredProducts}
                renderItem={({ item }) => <ProductCard key={item.id} product={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default DisplayProducts;