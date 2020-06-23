import * as React from 'react';
import { IShopBrand } from '../../globals/interfaces';
import { CARD_WIDTH, CARD_HEIGHT } from '../../globals/constants';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';

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

    console.log(shopBrands)
    React.useEffect(() => {
        if (!shopBrands || !shopBrands.length) return;
        const shopBrand = shopBrands.find((el) => el.id === shopBrandId)
        setShopImage(shopBrand.image);
        setShopName(shopBrand.name);
    }, [shopBrands])

    const mediaLoaded = !!shopImage && !!shopName;

    return (
        <View style={shopCardStyles.itemContainer}>
            <Text style={shopCardStyles.itemLabel}>{`Item ${shopName}`}</Text>
        </View>
    )
}

export default ShopCard;