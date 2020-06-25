import * as React from 'react';
import { selectShops } from '../../redux/shopsReducer';
import { useSelector } from 'react-redux';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { selectProducts } from '../../redux/productsReducer';
import { useParams } from 'react-router-native';
import { Portal, Surface, Title, Subheading, ActivityIndicator } from 'react-native-paper';
import { Modal, StyleSheet, TouchableOpacity, Image, ScrollView, View, Linking, TouchableWithoutFeedback } from 'react-native';
import { APP_IMAGES } from '../../globals/constants';
import DisplayProducts from '../Products/DisplayProducts';

const Shop = () => {
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const products = useSelector(selectProducts);
    const shops = useSelector(selectShops);
    const shopBrands = useSelector(selectShopBrands);
    let { id } = useParams();
    const [shop, setShop] = React.useState(null);
    const [shopProducts, setShopProducts] = React.useState([]);
    const [shopBrand, setShopBrand] = React.useState(null);

    React.useEffect(() => {
        if (!shops || !shops.length) return;

        const shop = shops.find((el) => el.id === id);

        if (!shop || !shopBrands || !shopBrands.length) return;

        const shopBrand = shopBrands.find((el) => el.id === shop.shopBrandId)

        setShop(shop);
        setShopBrand(shopBrand);

        if (!products || !products.length) return;

        setShopProducts(products.filter((el) => el.shopId === shop.id));
    }, [shopBrands, shops])

    const openGoogleMaps = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${shop.address.replace(/\s/g, '+')}`);
    }

    const mediaLoaded = !!shop && !!shopProducts && !!shopBrand;

    if (!mediaLoaded) return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} size='large' />
        </View>
    )

    return (
        <>
            <Portal>
                <Modal presentationStyle={'fullScreen'}
                    animated
                    animationType="fade"
                    transparent={false}
                    visible={dialogOpened}
                    onDismiss={() => { setDialogOpened(false) }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => setDialogOpened(false)}>
                        <Image style={styles.fullSizeImage} source={APP_IMAGES[shopBrand.image]}></Image>
                    </TouchableOpacity>
                </Modal >
            </Portal>
            <ScrollView>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setDialogOpened(false)}>
                    <Surface onTouchEnd={() => setDialogOpened(true)} style={styles.surface}>
                        <Image style={styles.image} source={APP_IMAGES[shopBrand.image]}></Image>
                    </Surface>
                </TouchableOpacity>
                <Surface style={styles.surface}>
                    <View>
                        <Title>{shop.name}</Title>
                        <Subheading>Shop address: {shop.address}</Subheading>
                        <TouchableWithoutFeedback onPress={openGoogleMaps}>
                            <Subheading>Check location on google maps</Subheading>
                        </TouchableWithoutFeedback>
                    </View>
                </Surface>
                <Surface style={[styles.surface, { width: '100%' }]}>
                    <DisplayProducts products={shopProducts}></DisplayProducts>
                </Surface>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    fullSizeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: 'gray'
    },
    dialog: {
        width: 'auto',
        height: 'auto',
        backgroundColor: 'gray'
    },
    dialogContent: {
        backgroundColor: 'gray',
        width: 'auto',
        height: 'auto',
    },
    surface: {
        width: '100%',
        padding: 8,
        height: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'row'
    },
});

export default Shop;