import * as React from 'react';
import { useTheme, Text } from 'react-native-paper';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { useHistory, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IBottomBarButton {
    iconName: string
    route: string
    text: string
    isActive: boolean
}

const BottomBarButton = ({ iconName, route, text, isActive }: IBottomBarButton) => {
    const history = useHistory();

    const onChangeRoute = () => {
        history.push(route);
    }

    const styles = StyleSheet.create({
        button: {
            height: '100%',
            paddingRight: 10,
            paddingLeft: 10,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: isActive ? 'orange' : 'darkorange'
        }
    })

    return (
        <TouchableHighlight onPress={onChangeRoute}>
            <View style={styles.button}>
                <Icon name={iconName} size={25}></Icon>
                <Text>{text}</Text>
            </View>
        </TouchableHighlight>
    )
}

const BottomBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const location = useLocation();

    return (
        <View style={{ flex: 0.08, display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'gray' }}>
            <BottomBarButton iconName="home" route="/" text="Home" isActive={location.pathname === '/'} />
            {isLoggedIn && <BottomBarButton iconName="favorites" route="/user-favorite-products" text="Favorite products" isActive={location.pathname === '/user-favorite-products'} />}
            {isLoggedIn && <BottomBarButton iconName="user" route="/user-profile" text="Profile" isActive={location.pathname === '/user-profile'} />}
            {!isLoggedIn && <BottomBarButton iconName="login" route="/login" text="Login" isActive={location.pathname === '/login'} />}
        </View>
    );
}

export default BottomBar;