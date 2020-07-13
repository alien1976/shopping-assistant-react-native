import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/productsReducer';
import { selectUserFavoritesProducts } from '../../redux/userReducer';
import DisplayProducts from '../Products/DisplayProducts';

const UserFavoriteProducts = () => {
    const allProducts = useSelector(selectProducts);
    const favoriteProducts = useSelector(selectUserFavoritesProducts);

    const products = React.useMemo(() => {
        if (!allProducts || !allProducts.length || !favoriteProducts || !favoriteProducts.length) return [];
        return allProducts.filter((el) => favoriteProducts.indexOf(el.id) !== -1)
    }, [allProducts, favoriteProducts]);

    return <DisplayProducts products={products} />
}

export default UserFavoriteProducts;