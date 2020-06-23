import * as React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CARD_ITEM_WIDTH } from '../../globals/constants';
import ProductCard from './ProductCard';
import { selectProducts } from '../../redux/productsReducer';
import CarouselComponent from '../Carousel/CarouselComponent';

const LatestProducts = () => {
    const products = useSelector(selectProducts);
    const [latestProducts, setLatestProducts] = React.useState([]);

    React.useEffect(() => {
        if (!products || !products.length) return;
        setLatestProducts(products.slice(Math.max(products.length - 5, 0)))
    }, [products])

    const _renderItem = ({ item, index }) => {
        return <ProductCard product={item}></ProductCard>
    }

    return <CarouselComponent title={'Latest products added'} data={latestProducts} renderItem={_renderItem} />
}

export default LatestProducts;