import React from "react";
import { useDispatch } from 'react-redux'
import { NativeRouter, Route } from "react-router-native";
import PopularShops from "./components/Shops/PopularShops";
import { getAllShops } from "./redux/shopsReducer";
import { getAllShopBrands } from "./redux/shopBrandsReducer";
import { getAllProducts } from "./redux/productsReducer";
import LatestProducts from "./components/Products/LatestProducts";
import { ScrollView } from "react-native";

const Home = () => {
    return (
        <>
            <PopularShops></PopularShops>
            <LatestProducts></LatestProducts>
        </>)
}

const AppContainer = () => {
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
        <ScrollView >
            <Route exact path="/">
                <Home></Home>
            </Route>
        </ScrollView>
    )
}

export default AppContainer;