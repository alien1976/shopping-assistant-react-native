import * as React from 'react';
import { IProduct, IShop } from '../../globals/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart, addProductToCart, selectFastestPath, setFastestPath } from '../../redux/cartReducer';
import { useLocation } from 'react-router-native';
import { Title, Subheading, List, Avatar } from 'react-native-paper';
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/Card.style'
import { WebView } from 'react-native-webview';
import { pathGenerator } from './PathGenerator.worker';
import MapPathFinder from '../Map/MapPathFinder';

interface IShoppingNavigationProps {
    products: (IProduct & { bought: boolean })[]
    shop: IShop
}

const listStyles = StyleSheet.create({
    item: {
        backgroundColor: 'green',
        marginBottom: 5,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#aaaaaa',
        borderWidth: 1,
    },
    itemBought: {
        backgroundColor: 'gray',
        marginBottom: 5,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#aaaaaa',
        borderWidth: 1
    },
    title: {
        color: 'white'
    },
    description: {
        color: '#cccccc'
    }
})

const ShoppingNavigation = () => {
    const webViewRef = React.useRef(null);
    const location = useLocation<IShoppingNavigationProps>();

    if (!location.state) {
        return <Title>Invalid URL.</Title>
    }

    const fastestPath = useSelector(selectFastestPath);
    const shop = location.state.shop;
    const dispatch = useDispatch();
    const findingPath = React.useRef(false);
    const startPoint = React.useRef(shop.mapEntryPoint);
    const [loadProcess, setLoadProcess] = React.useState(false);
    const [availableProducts, setAvailableProducts] = React.useState(location.state.products.filter((el) => !el.bought));
    const [boughtProducts, setBoughtProducts] = React.useState(location.state.products.filter((el) => el.bought));

    const changeAvailableProductsOrder = () => {
        const reorderedProducts: (IProduct & { bought: boolean })[] = [];

        for (let product of fastestPath) {
            const availableProduct = availableProducts.find((el) => el.coordinates === product);
            if (availableProduct && reorderedProducts.findIndex((el) => el.id === availableProduct.id) === -1) {
                reorderedProducts.push(availableProduct)
            }
        }

        return reorderedProducts;
    }

    const [orderedAvailableProducts, setOrderedAvailableProducts] = React.useState(changeAvailableProductsOrder());

    React.useEffect(() => {
        if (!boughtProducts.length) startPoint.current = shop.mapEntryPoint;
    }, [boughtProducts])

    React.useEffect(() => {
        setOrderedAvailableProducts(changeAvailableProductsOrder())
    }, [fastestPath, availableProducts])

    React.useEffect(() => {
        findShortestPath();
    }, [availableProducts]);

    const findShortestPath = React.useCallback(() => {
        if (findingPath.current) return;
        setLoadProcess(true);
        findingPath.current = true;
        webViewRef.current.postMessage(JSON.stringify({
            mapPath: JSON.parse(shop.map),
            mapEntryPoint: startPoint.current,
            products: availableProducts.map((el) => el.coordinates)
        }))
    }, [availableProducts])

    const handleMessage = (event) => {
        const message = JSON.parse(event.nativeEvent.data);
        if (!message.finish) {
            return;
        }
        dispatch(setFastestPath(message.path))
        findingPath.current = false;
        setLoadProcess(false);
    }

    const toggleProduct = (productId: string, productIsAvailable: boolean) => {
        if (findingPath.current) return;
        const product = productIsAvailable ?
            availableProducts.find((el) => el.id === productId) :
            boughtProducts.find((el) => el.id === productId);

        startPoint.current = product.coordinates;

        if (productIsAvailable) {
            setAvailableProducts(availableProducts.filter((el) => el.id !== productId));
            setBoughtProducts([product, ...boughtProducts]);
            dispatch(removeProductFromCart(product.id.toString()))
        } else {
            setBoughtProducts(boughtProducts.filter((el) => el.id !== productId));
            setAvailableProducts([product, ...availableProducts]);
            dispatch(addProductToCart(product.id.toString()))
        }

    }

    //Used to create a new thread so the main won't be blocked when the shortest path is calculated (because the calculation is heavy)
    //It represents a web worker but using the webview because all the react-native webworker npm modules had a lot of integration issues
    const WebWorkerView = React.useMemo(() => <View style={{ flex: 1, width: 0, height: 0, display: 'none' }}>
        <WebView
            ref={(webView) => webViewRef.current = webView}
            javaScriptEnabled={true}
            originWhitelist={['*']}
            source={{
                html: `<script>
                    ${pathGenerator}
                    document.addEventListener('message', (event) => {
                        const data = JSON.parse(event.data)
                        try{
                            const path = findPath(data.mapPath, data.mapEntryPoint, data.products);
                            window.ReactNativeWebView.postMessage(JSON.stringify({path: path.path, finish: path.finish, error: null}));
                        }catch(error){
                            window.ReactNativeWebView.postMessage(JSON.stringify({path: [], finish: true, error: error}));
                        }
                    })
                    </script>` }}
            onMessage={handleMessage}
        />
    </View>, [handleMessage])

    const mediaLoaded = !!availableProducts && !!boughtProducts;

    return (
        <SafeAreaView style={{
            marginTop: 5,
            alignItems: 'center',
            width: '100%',
            height: '100%'
        }} >
            {WebWorkerView}
            <View style={{ width: '90%', alignItems: 'center' }}>
                <Title style={[styles.titleEven]}>Currently shopping in: {shop.name}</Title>
                <Subheading style={[styles.subtitleEven]}>{shop.address}</Subheading>
            </View>
            <MapPathFinder
                mapImgUrl={shop.mapImage}
                products={orderedAvailableProducts.map((el) => el.coordinates)}
                loadProcess={loadProcess}
                startPoint={startPoint.current} />
            <FlatList
                style={{ width: '95%' }}
                ListHeaderComponent={<>
                    <List.Subheader style={{ marginLeft: '-3%', fontSize: 20, paddingBottom: 0, color: 'white' }}>Products to buy</List.Subheader>
                    <List.Subheader style={{ marginLeft: '-3%', color: '#aaaaaa' }}>Total products price: {availableProducts.reduce((a, b) => a + b.price, 0)} lv.</List.Subheader>
                </>}
                data={orderedAvailableProducts}
                renderItem={({ item, index }) => {
                    return <TouchableOpacity style={{ opacity: loadProcess ? 0.5 : 1 }} disabled={loadProcess} onPress={() => toggleProduct(item.id, true)}>
                        <List.Item
                            style={listStyles.item}
                            titleStyle={listStyles.title}
                            title={(index + 1) + '. ' + item.name}
                            descriptionStyle={listStyles.description}
                            description={item.price}
                            left={props => <Avatar.Image size={50} source={{ uri: item.image }} />}
                        />
                    </TouchableOpacity>
                }}
                ListFooterComponent={<>
                    <List.Subheader style={{ marginLeft: '-3%', fontSize: 20, paddingBottom: 0, color: 'white' }}>Bought products</List.Subheader>
                    <List.Subheader style={{ marginLeft: '-3%', color: '#aaaaaa' }}>Total money spent: {boughtProducts.reduce((a, b) => a + b.price, 0)} lv.</List.Subheader>
                    <FlatList
                        data={boughtProducts}
                        renderItem={({ item }) => {
                            return <TouchableOpacity style={{ opacity: loadProcess ? 0.5 : 1 }} disabled={loadProcess} onPress={() => toggleProduct(item.id, false)}>
                                <List.Item
                                    style={listStyles.itemBought}
                                    titleStyle={listStyles.title}
                                    title={item.name}
                                    descriptionStyle={listStyles.description}
                                    description={item.price}
                                    left={props => <Avatar.Image size={50} source={{ uri: item.image }} />}
                                />
                            </TouchableOpacity>
                        }}
                        keyExtractor={item => item.id}
                    />
                </>}
                keyExtractor={item => item.id}
            />

        </SafeAreaView >
    )
}

export default React.memo(ShoppingNavigation);