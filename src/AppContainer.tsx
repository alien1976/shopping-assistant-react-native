import React from "react";
import { Provider as StoreProvider, useDispatch } from 'react-redux'
import { NativeRouter, Route } from "react-router-native";
import store from "./redux/store";
import PopularShops from "./components/Shops/PopularShops";
import { getAllShops } from "./redux/shopsReducer";
import { getAllShopBrands } from "./redux/shopBrandsReducer";

const Home = () => {
    return (
        <>
            <PopularShops></PopularShops>
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
        console.log('getting shops')
        // dispatch(getAllProducts());

        // if (isLoggedIn) {
        //   try {
        //     dispatch(getUserData(JSON.parse(localStorage.user).user.id))
        //   } catch (error) {
        //     console.error(error)
        //   }
        // }
    }, [])

    return (
        <Route exact path="/">
            <Home></Home>
        </Route>
    )
}

export default AppContainer;