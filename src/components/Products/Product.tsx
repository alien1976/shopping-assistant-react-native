import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/productsReducer';
import { selectShops } from '../../redux/shopsReducer';
import { useParams } from 'react-router-native';
import { Surface, Title, ActivityIndicator, Subheading, Portal } from 'react-native-paper';
import { Image, StyleSheet, View, ScrollView, Text, Modal, TouchableOpacity } from 'react-native';
import ProductLocationMap from '../Map/ProductLocationMap';

const Product = () => {
    let { id } = useParams();
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const products = useSelector(selectProducts);
    const [product, setProduct] = React.useState(null);

    React.useEffect(() => {
        if (!products || !products.length) return;

        const product = products.find((el) => el.id === id);
        if (!product) return;
        setProduct(product);
    }, [products])

    const shops = useSelector(selectShops);
    const [productShop, setProductShop] = React.useState(null);

    React.useEffect(() => {
        if (!shops || !shops.length || !product) return;

        const productShop = shops.find((el) => el.id === product.shopId)

        if (!productShop) return;

        setProductShop(productShop);
    }, [shops, product])

    const mediaLoaded = !!product && !!productShop;

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
                        <Image style={styles.fullSizeImage} source={{ uri: product.image }}></Image>
                    </TouchableOpacity>
                </Modal >
            </Portal>
            <ScrollView>
                <TouchableOpacity activeOpacity={0.6} onPress={() => setDialogOpened(false)}>
                    <Surface onTouchEnd={() => setDialogOpened(true)} style={styles.surface}>
                        <Image style={styles.image} source={{ uri: product.image }}></Image>
                    </Surface>
                </TouchableOpacity>
                <Surface style={styles.surface}>
                    <View>
                        <Title>{product.name}</Title>
                        <Subheading>Price: {product.price}</Subheading>
                    </View>
                </Surface>
                <Surface style={styles.surface}>
                    <View>
                        <Title>Product shop details</Title>
                        <Subheading>Name: <Text>{productShop.name}</Text> </Subheading>
                        <Subheading>Address: <Text>{productShop.address}</Text></Subheading>
                    </View>
                </Surface>
                <Surface style={styles.surface}>
                    <View>
                        <Title>Product shop location</Title>
                        <Subheading>Name: <Text>{productShop.name}</Text> </Subheading>
                        <Subheading>Address: <Text>{productShop.address}</Text></Subheading>
                    </View>
                </Surface>
                <Surface style={styles.surface}>
                    <View>
                        <Title>Product shop location</Title>
                        <ProductLocationMap mapImgUrl={productShop.mapImage} productCoordinates={product.coordinates} />
                    </View>
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

export default React.memo(Product);