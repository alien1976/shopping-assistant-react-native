import * as React from 'react';
import { APP_IMAGES } from '../../globals/constants';
import { selectShopBrands } from '../../redux/shopBrandsReducer';
import { useSelector } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/Card.style'
import { useHistory } from 'react-router-native';

interface IProductCardProps {
    shopBrandId: string
    shopId: string
    address: string
    disabled: boolean
}

const ShopCard = ({ shopBrandId, shopId, address, disabled = false }: IProductCardProps) => {
    const shopBrands = useSelector(selectShopBrands);
    const [shopImage, setShopImage] = React.useState('');
    const [shopName, setShopName] = React.useState('');
    const history = useHistory();

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
            onPress={() => { }}
            disabled={disabled}
            activeOpacity={1}
            style={styles.slideInnerContainer}
        >
            <View style={[styles.imageContainer, styles.imageContainerEven]}>
                <TouchableOpacity disabled={disabled} style={{ width: '100%', height: '100%' }} onPress={() => { history.push(`/shops/${shopId}`) }}>
                    <Image
                        source={APP_IMAGES[shopImage]}
                        style={styles.image}
                    />
                </TouchableOpacity>
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