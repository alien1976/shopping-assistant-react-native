import * as React from 'react';
import { IShopBrand } from '../../globals/interfaces';
import { CARD_WIDTH, CARD_HEIGHT, APP_IMAGES } from '../../globals/constants';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/ShopCard.style';
import { ParallaxImage } from 'react-native-snap-carousel';

interface IProductCardProps {
    shopBrandId: string
    shopId: string
    address: string
}

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

export const shopCardStyles = StyleSheet.create({
    carouselContainer: {
        marginTop: 50
    },
    itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
    },
    itemLabel: {
        color: 'white',
        fontSize: 24
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        width: ITEM_WIDTH - 100,
        height: ITEM_HEIGHT - 100
    }
});

const ShopCard = ({ shopBrandId, shopId, address }: IProductCardProps) => {
    const shopBrands = useSelector(selectShopBrands);
    const [shopImage, setShopImage] = React.useState('');
    const [shopName, setShopName] = React.useState('');

    React.useEffect(() => {
        if (!shopBrands || !shopBrands.length) return;
        const shopBrand = shopBrands.find((el) => el.id === shopBrandId)
        setShopImage(shopBrand.image);
        setShopName(shopBrand.name);
    }, [shopBrands])

    const mediaLoaded = !!shopImage && !!shopName;

    const uppercaseTitle = shopName ? (
        <Text
            style={[styles.title, styles.titleEven]}
            numberOfLines={2}
        >
            {shopName.toUpperCase()}
        </Text>
    ) : false;

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
            onPress={() => { console.log(`You've clicked '${shopName}'`); }}
        >
            <View style={[styles.imageContainer, styles.imageContainerEven]}>
                <Image
                    source={APP_IMAGES[shopImage]}
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
                    {address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ShopCard;