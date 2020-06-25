import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NativeRouter, Route, Switch } from "react-router-native";
import PopularShops from "./components/Shops/PopularShops";
import { getAllShops } from "./redux/shopsReducer";
import { getAllShopBrands } from "./redux/shopBrandsReducer";
import { getAllProducts, selectProducts } from "./redux/productsReducer";
import LatestProducts from "./components/Products/LatestProducts";
import { ScrollView, SafeAreaView } from "react-native";
import AllShops from "./components/AllShops/AllShops";
import DisplayProducts from "./components/Products/DisplayProducts";
import Product from "./components/Products/Product";
import Shop from "./components/Shops/Shop";

const Home = () => {
    return (
        <>
            <PopularShops></PopularShops>
            <LatestProducts></LatestProducts>
        </>)
}

const AppContainer = () => {
    const products = useSelector(selectProducts);
    // const isLoggedIn = useSelector(selectLoggedIn);
    // const userRole = useSelector(selectUserRole);
    const dispatch = useDispatch();

    React.useEffect(() => {
        // dispatch(getAllShopBrands());
        dispatch(getAllShops());
        dispatch(getAllShopBrands());
        dispatch(getAllProducts());

        // if (isLoggedIn) {
        //   try {
        //     dispatch(getUserData(JSON.parse(localStorage.user).user.id))
        //   } catch (error) {
        //     console.error(error)
        //   }
        // }
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: '#757575', height: '100%' }} >
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route path="/shops/:id">
                    <Shop></Shop>
                </Route>
                <Route path="/shops">
                    <AllShops></AllShops>
                </Route>
                <Route path="/products/:id">
                    <Product></Product>
                </Route>
                <Route path="/products">
                    <DisplayProducts products={products}></DisplayProducts>
                </Route>
            </Switch>
        </SafeAreaView>
    )
}

export default AppContainer;