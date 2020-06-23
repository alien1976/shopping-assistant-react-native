import * as React from 'react';
import ShopCard, { ITEM_WIDTH, SLIDER_WIDTH } from './ShopCard';
import { useSelector } from 'react-redux';
import { selectShops } from '../../redux/shopsReducer';
import { Link } from 'react-router-native';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { shopCardStyles } from './ShopCard';
import { scrollInterpolator, animatedStyles } from '../../utils/utils';

const styles = StyleSheet.create({
    contentTitle: {
        // margin: '0auto',
        overflow: 'hidden',
        width: '100%',
        textAlign: 'center'
    },
    productsGrid: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        // paddingLeft: '10px'
    }
})

const PopularShops = () => {
    const shops = useSelector(selectShops);
    const caroselRef = React.useRef(null);
    const [latestShops, setLatestShops] = React.useState([1, 2]);

    React.useEffect(() => {
        setLatestShops(shops.slice(Math.max(shops.length - 5, 0)));
    }, [shops])

    const _renderItem = ({ item, index }) => {
        return <ShopCard shopBrandId={item.shopBrandId} address={item.address} shopId={item.shopId}></ShopCard>
    }

    return (
        <>
            <View style={styles.contentTitle}>
                <Text>Latest shops added</Text>
            </View>
            <View style={styles.productsGrid}>
                <Carousel
                    layout={'default'}
                    layoutCardOffset={20}
                    ref={(c) => caroselRef.current = c}
                    data={latestShops}
                    renderItem={_renderItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    containerCustomStyle={shopCardStyles.carouselContainer}
                    inactiveSlideShift={0}
                />
            </View>
        </>
    )
}



export default PopularShops;