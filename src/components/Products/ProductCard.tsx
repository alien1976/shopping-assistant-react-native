import * as React from 'react';
import { addProductToCart, removeProductFromCart } from '../../redux/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../redux/store';
import { IProduct } from '../../globals/interfaces';
import { selectLoggedIn } from '../../redux/authenticationReducer';
import { addProductToFavorites, selectUserFavoritesProducts, removeProductFromFavorites } from '../../redux/userReducer';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import styles from '../../styles/Card.style'
import { Link, useHistory } from 'react-router-native';

interface IProductCardProps {
    product: IProduct
}

const ProductCard = ({ product }: IProductCardProps) => {
    const { image, id, name, price } = product;
    const history = useHistory();
    const isInCart = useSelector((state: IStoreState) => state.appState.cart.indexOf(id.toString()) !== -1);
    const favoriteProducts = useSelector(selectUserFavoritesProducts);
    const isProductInFavorite = React.useMemo(() => {
        if (!favoriteProducts) return false;

        return favoriteProducts.indexOf(product.id) !== -1;
    }, [favoriteProducts]);

    const dispatch = useDispatch();
    const isUserLogged = useSelector(selectLoggedIn);
    const mediaLoaded = !!image && !!name;

    const productToCartToggle = () => {
        if (isInCart) {
            dispatch(removeProductFromCart(id.toString()));
        } else {
            dispatch(addProductToCart(id.toString()));
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
            activeOpacity={0.7}
            style={styles.slideInnerContainer}
        >
            <View style={[styles.imageContainer, styles.imageContainerEven]} onTouchEnd={() => { history.push(`/products/${product.id}`) }}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                <View style={[styles.radiusMask, styles.radiusMaskEven]} />
            </View>
            <View style={[styles.textContainer, styles.textContainerEven]}>
                {uppercaseTitle}
                <Text
                    style={[styles.subtitle, styles.subtitleEven]}
                    numberOfLines={2}
                >
                    {price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(ProductCard);