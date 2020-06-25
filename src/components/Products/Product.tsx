import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/productsReducer';
import { selectShops } from '../../redux/shopsReducer';
import { useParams } from 'react-router-native';
import { Surface, Title, Divider, ActivityIndicator, Subheading, IconButton, Portal, Dialog, Headline, Caption } from 'react-native-paper';
import { Image, StyleSheet, Dimensions, View, ScrollView, Text, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import { APP_IMAGES } from '../../globals/constants';
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

    if (!mediaLoaded) return <ActivityIndicator animating={true} size='large' />;

    return (
        <>
            <Portal>
                <Modal
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
        // <div className={classes.root}>
        //     {mediaLoaded ?
        //         <Paper className={classes.paper}>
        //             <Grid container spacing={4}>
        //                 <Grid item>
        //                     {product && product.image ?
        //                         <img className={classes.img} alt="complex" src={product.image} />
        //                         : <div>
        //                             <CardLoader loaded={product && product.image} />
        //                         </div>}
        //                 </Grid>
        //                 <Grid item xs={12} sm container>
        //                     <Grid item xs container direction="column" spacing={2}>
        //                         <Grid item xs>
        //                             <Typography gutterBottom variant="subtitle1">
        //                                 {product.name}
        //                             </Typography>
        //                             <Typography variant="body2" gutterBottom>
        //                                 Description: {product.description}
        //                             </Typography>
        //                         </Grid>
        //                         <Grid item>
        //                             <Typography variant="body1" gutterBottom>
        //                                 Shop location:
        //                             </Typography>
        //                             <Typography variant="body2" gutterBottom>
        //                                 {productShop.name}
        //                             </Typography>
        //                             <Typography variant="body2" gutterBottom>
        //                                 {productShop.address}
        //                             </Typography>
        //                         </Grid>
        //                         <Grid item>
        //                             <Typography variant="body2" style={{ cursor: 'pointer', userSelect: 'none' }}>
        //                                 Add to chart
        //                             </Typography>
        //                         </Grid>
        //                         <Grid item>
        //                             <Typography variant="body1" gutterBottom>
        //                                 Product location in shop:
        //                             </Typography>
        //                         </Grid>
        //                         <Grid item className={classes.map}>
        //                             <ProductLocationMap productCoordinates={product.coordinates} mapImgUrl={productShop.mapImage} />
        //                         </Grid>
        //                     </Grid>
        //                     <Grid item>
        //                         <Typography variant="subtitle1">Price: {product && product.price || '...'} lv.</Typography>
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
        //         </Paper>
        //         : <ItemLoader loadingMessage="Loading product info. Please wait..." />}
        // </div>
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