import * as React from 'react';
import { addProductToCart, removeProductFromCart, selectCart } from '../../redux/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { IProduct } from '../../globals/interfaces';
import { selectLoggedIn } from '../../redux/authenticationReducer';
import { addProductToFavorites, selectUserFavoritesProducts, removeProductFromFavorites, selectUserCart, removeProductFromUserCart, addProductToUserCart } from '../../redux/userReducer';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from '../../styles/Card.style'
import { useHistory } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconType2 from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: IProductCardProps) => {
    const { image, id, name, price } = product;
    const history = useHistory();
    const favoriteProducts = useSelector(selectUserFavoritesProducts);
    const isProductInFavorite = React.useMemo(() => {
        if (!favoriteProducts) return false;

        return favoriteProducts.indexOf(product.id) !== -1;
    }, [favoriteProducts]);

    const dispatch = useDispatch();
    const isUserLogged = useSelector(selectLoggedIn);

    const userCart = useSelector(selectUserCart);
    const cart = useSelector(selectCart);
    const isInCart = React.useMemo(() => {
        if (isUserLogged) return userCart && userCart.indexOf(id.toString()) !== -1 ? true : false;

        return cart && cart.indexOf(id.toString()) !== -1 ? true : false;
    }, [isUserLogged, userCart, cart])

    const mediaLoaded = !!image && !!name;

    const productToCartToggle = () => {
        if (isInCart) {
            !isUserLogged ? dispatch(removeProductFromCart(id.toString())) : dispatch(removeProductFromUserCart(id.toString()));
        } else {
            !isUserLogged ? dispatch(addProductToCart(id.toString())) : dispatch(addProductToUserCart(id.toString()));
        }
    }

    const addToFavorites = () => {
        if (!isProductInFavorite) {
            dispatch(addProductToFavorites(product.id))
        } else {
            dispatch(removeProductFromFavorites(product.id))
        }
    }

    const uppercaseTitle = name ? (
        <Text
            style={[styles.title, styles.titleEven]}
            numberOfLines={2}
        >
            {name.toUpperCase()}
        </Text>
    ) : false;

    return (
        <TouchableOpacity
            activeOpacity={1}
            disabled={true}
            style={styles.slideInnerContainer}
        >
            <View style={[styles.imageContainer, styles.imageContainerEven]}>
                <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => { history.push(`/products/${product.id}`) }}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={[styles.radiusMask, styles.radiusMaskEven]} />
            </View>
            <View style={[styles.textContainer, styles.textContainerEven]}>
                {uppercaseTitle}
                <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text
                        style={[styles.subtitle, styles.subtitleEven]}
                        numberOfLines={2}
                    >
                        {price}
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {isUserLogged &&
                            <TouchableOpacity onPress={addToFavorites}>
                                <Text
                                    style={[styles.subtitle, styles.subtitleEven, { marginRight: 20, textAlign: 'center', textAlignVertical: 'center' }]}
                                >
                                    {<Icon name={isProductInFavorite ? 'favorite' : 'favorite-border'} size={30} />}
                                </Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={productToCartToggle}>
                            <Text
                                style={[styles.subtitle, styles.subtitleEven, { textAlignVertical: 'center', textAlign: 'center' }]}
                            >
                                <IconType2 name={isInCart ? 'cart' : 'cart-outline'} onPress={productToCartToggle} size={30} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}

export default React.memo(ProductCard);