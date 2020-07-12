import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from "react-router-native";
import PopularShops from "./components/Shops/PopularShops";
import { getAllShops } from "./redux/shopsReducer";
import { getAllShopBrands } from "./redux/shopBrandsReducer";
import { getAllProducts, selectProducts } from "./redux/productsReducer";
import LatestProducts from "./components/Products/LatestProducts";
import { SafeAreaView, ScrollView, View } from "react-native";
import AllShops from "./components/AllShops/AllShops";
import DisplayProducts from "./components/Products/DisplayProducts";
import Product from "./components/Products/Product";
import Shop from "./components/Shops/Shop";
import BottomBar from "./components/MenuAppBar/BottomBar";
import { selectLoggedIn } from "./redux/authenticationReducer";
import { getUserData } from "./redux/userReducer";
import Login from "./components/Users/Login";

const Home = () => {
    return (
        <>
            <PopularShops></PopularShops>
            <LatestProducts></LatestProducts>
        </>)
}

const AppContainer = () => {
    const products = useSelector(selectProducts);
    const isLoggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllShops());
        dispatch(getAllShopBrands());
        dispatch(getAllProducts());

        if (isLoggedIn) {
            try {
                dispatch(getUserData(JSON.parse(localStorage.user).user.id))
            } catch (error) {
                console.error(error)
            }
        }
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: '#757575', height: '100%' }} >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.92 }}>
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
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                    </Switch>
                </View>
                <BottomBar isLoggedIn={isLoggedIn} />
            </View>
        </SafeAreaView>
    )
}

export default AppContainer;