import * as React from 'react';
import { Text } from 'react-native-paper';
import { View, TouchableHighlight, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { useHistory, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../redux/authenticationReducer';

interface IBottomBarButton {
    iconName: string
    route?: string
    text: string
    isActive?: boolean
    onButtonPress?: () => void
}

const BottomBarButton = ({ iconName, route, text, onButtonPress, isActive }: IBottomBarButton) => {
    const history = useHistory();

    const onChangeRoute = () => {
        if (!route) return;

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
            backgroundColor: isActive ? 'darkgray' : 'transparent'
        }
    })

    return (
        <TouchableOpacity onPress={(route && onChangeRoute) || onButtonPress}>
            <View style={styles.button}>
                {iconName === 'favorite' ? <MaterialIcon name={iconName} size={25} /> : <Icon name={iconName} size={25} />}
                <Text>{text}</Text>
            </View>
        </TouchableOpacity >
    )
}

const BottomBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [keyBoardVisible, setKeyBoardVisible] = React.useState(false)

    React.useEffect(() => {
        Keyboard.addListener("keyboardDidShow", onKeyBoardVisible);
        Keyboard.addListener("keyboardDidHide", onKeyBoardNotVisible);

        return () => {
            Keyboard.removeListener("keyboardDidShow", onKeyBoardVisible);
            Keyboard.removeListener("keyboardDidHide", onKeyBoardNotVisible);
        };
    }, []);

    const onKeyBoardVisible = () => {
        setKeyBoardVisible(true)
    }

    const onKeyBoardNotVisible = () => {
        setKeyBoardVisible(false)
    }

    const onSignOut = () => {
        dispatch(logoutRequest())
    };

    if (keyBoardVisible) return null;

    return (
        <View style={{ flex: 0.08, display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'gray' }}>
            <BottomBarButton iconName="home" route="/" text="Home" isActive={location.pathname === '/'} />
            {isLoggedIn && <BottomBarButton iconName="favorite" route="/user-favorite-products" text="Favorite products" isActive={location.pathname === '/user-favorite-products'} />}
            {isLoggedIn && <BottomBarButton iconName="user" route="/user-profile" text="Profile" isActive={location.pathname === '/user-profile'} />}
            {isLoggedIn && <BottomBarButton iconName="sign-out" text="Log out" onButtonPress={onSignOut} />}
            {!isLoggedIn && <BottomBarButton iconName="sign-in" route="/login" text="Login" isActive={location.pathname === '/login'} />}
            {!isLoggedIn && <BottomBarButton iconName="pencil-square" route="/sign-up" text="Sign up" isActive={location.pathname === '/sign-up'} />}
        </View>
    );
}

export default BottomBar;