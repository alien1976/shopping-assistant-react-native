import { Dimensions } from "react-native";

export const CARD_WIDTH = 250;
export const CARD_HEIGHT = 250;

export const SA_API_BASE = "http://192.168.0.104:8080/api";

export const USER_ROLES = {
    'User': 'User',
    'Shop Manager': 'Shop Manager',
    'Shop Owner': 'Shop Owner',
    'Admin': 'Admin'
}

export const APP_IMAGES = {
    'images/balla.png': require('../assets/images/balla.png'),
    'images/fantastichi.png': require('../assets/images/fantastichi.png'),
    'images/kaaufland.png': require('../assets/images/kaaufland.png'),
    'images/shopMap.svg': require('../assets/images/shopMap.svg'),
    'images/ttmarket.png': require('../assets/images/ttmarket.png'),
    'favicon.png': require('../assets/favicon/android-chrome-192x192.png')
}

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
export const CARD_ITEM_HEIGHT = Math.round(CARD_ITEM_WIDTH * 3 / 4);
