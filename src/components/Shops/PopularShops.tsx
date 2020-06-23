import * as React from 'react';
import ShopCard from './ShopCard';
import { useSelector } from 'react-redux';
import { selectShops } from '../../redux/shopsReducer';
import CarouselComponent from '../Carousel/CarouselComponent';

const PopularShops = () => {
    const shops = useSelector(selectShops);
    const [latestShops, setLatestShops] = React.useState([1, 2]);

    React.useEffect(() => {
        setLatestShops(shops.slice(Math.max(shops.length - 5, 0)));
    }, [shops])

    const _renderItem = ({ item, index }) => {
        return <ShopCard shopBrandId={item.shopBrandId} address={item.address} shopId={item.shopId}></ShopCard>
    }

    return <CarouselComponent title={'Latest shops added'} data={latestShops} renderItem={_renderItem} />
}

export default PopularShops;