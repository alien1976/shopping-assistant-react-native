import * as React from 'react';
import ShopCard from '../Shops/ShopCard';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cartReducer';
import { selectShops } from '../../redux/shopsReducer';
import { selectProducts } from '../../redux/productsReducer';
import { Redirect } from 'react-router-native';
import { Title, ActivityIndicator, Badge, Text } from 'react-native-paper';
import { FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import styles from '../../styles/Card.style'
import { selectLoggedIn } from '../../redux/authenticationReducer';
import { selectUserCart } from '../../redux/userReducer';

const ShoppingChart = () => {
    const allShops = useSelector(selectShops);
    const products = useSelector(selectProducts);
    const isUserLogged = useSelector(selectLoggedIn);
    const userCart = useSelector(selectUserCart);
    const cart = useSelector(selectCart);
    const [shops, setShops] = React.useState([]);
    const [allProducts, setAllProducts] = React.useState([]);
    const [initData, setInitData] = React.useState(false);
    const [navigateToShop, setNavigateToShop] = React.useState({ shouldNavigate: false, item: null })

    const productsInCartIds = React.useMemo(() => {
        if (isUserLogged) return userCart;

        return cart;
    }, [isUserLogged, userCart, cart])

    React.useEffect(() => {
        setInitData(true)
        if (!products || !products.length || !allShops || !allShops.length || !productsInCartIds || !productsInCartIds.length) return;

        const productsTemp = products.filter((el) => productsInCartIds.indexOf(el.id.toString()) !== -1);
        setAllProducts(productsTemp.map((el) => { return { ...el, bought: false } }));
        setShops(allShops.filter((el) => productsTemp.findIndex((product) => product.shopId === el.id) !== -1))
    }, [productsInCartIds, products, allShops])

    const getShopBrandProductsCount = React.useCallback((shopId: string) => {
        let count = 0;

        for (let product of allProducts) {
            if (product.shopId === shopId) count++;
        }

        return count;
    }, [allProducts]);

    const getShopBrandCartProducts = React.useCallback((shopId: string) => {
        const products = [];

        for (let product of allProducts) {
            if (product.shopId === shopId) products.push(product);
        }

        return products;
    }, [allProducts]);

    const mediaLoaded = !!allProducts && !!shops

    if (!mediaLoaded) {
        return (<View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} size='large' />
        </View>)
    }

    if (navigateToShop.shouldNavigate) {
        return <Redirect
            to={{
                pathname: `/shopping-cart/${navigateToShop.item.id}`,
                search: '',
                state: { products: getShopBrandCartProducts(navigateToShop.item.id), shop: navigateToShop.item }
            }}
        />
    }

    if (shops.length === 1) {
        return <Redirect
            to={{
                pathname: `/shopping-cart/${shops[0].id}`,
                search: '',
                state: { products: getShopBrandCartProducts(shops[0].id), shop: shops[0] }
            }}
        />
    }

    if (!shops.length && initData) {
        return (
            <Title style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>There are no products inside the cart!</Title>
        );
    }

    if (shops.length > 1) {
        return (
            <SafeAreaView style={{
                marginTop: 5,
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }} >
                <Text style={[styles.title, styles.titleEven, { width: '90%', padding: 10 }]}>You've selected a products from different shops. Please select one shop from the list to continue with the shopping!</Text>
                <FlatList style={{ width: '100%' }}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    ListHeaderComponent={!mediaLoaded ? <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator animating={true} size='large' />
                    </View> : null}
                    data={shops}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => { setNavigateToShop({ shouldNavigate: true, item: item }) }}
                            // activeOpacity={1}
                            style={styles.slideInnerContainer}
                        >
                            <Badge style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}>{getShopBrandProductsCount(item.id)}</Badge>
                            <ShopCard disabled={true} key={item.id} shopId={item.id} shopBrandId={item.shopBrandId} address={item.address} />
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }

    return null;
}

export default React.memo(ShoppingChart);