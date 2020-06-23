import * as React from 'react';
import { APP_IMAGES } from '../../globals/constants';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/Card.style'

interface IProductCardProps {
    shopBrandId: string
    shopId: string
    address: string
}

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
            activeOpacity={0.7}
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