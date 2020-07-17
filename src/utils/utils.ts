import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { getInputRangeFromIndexes } from "react-native-snap-carousel";

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function authHeader(): Promise<{ [key: string]: string }> {
    const user = JSON.parse(await AsyncStorage.getItem('user'))

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export const handleResponse = async (response: any, onError?: () => void) => {
    const res = await response;
    const text = await res.text()

    const data = text && JSON.parse(text);
    if (!res.ok) {
        if (res.status === 401 && onError) {
            onError();
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}



const SLIDER_WIDTH = Dimensions.get('window').width;
const TRANSLATE_VALUE = Math.round(SLIDER_WIDTH * 0.3 / 4);

export function scrollInterpolator(index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
}
export function animatedStyles(index, animatedValue, carouselProps) {
    const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';
    let animatedOpacity = {};
    let animatedTransform = {};

    if (carouselProps.inactiveSlideOpacity < 1) {
        animatedOpacity = {
            opacity: animatedValue.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [carouselProps.inactiveSlideOpacity, 1, carouselProps.inactiveSlideOpacity]
            })
        };
    }

    if (carouselProps.inactiveSlideScale < 1) {
        animatedTransform = {
            transform: [{
                scale: animatedValue.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [carouselProps.inactiveSlideScale, 1, carouselProps.inactiveSlideScale]
                }),
                [translateProp]: animatedValue.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [
                        TRANSLATE_VALUE * carouselProps.inactiveSlideScale,
                        0,
                        -TRANSLATE_VALUE * carouselProps.inactiveSlideScale]
                }),
            }]
        };
    }

    return {
        ...animatedOpacity,
        ...animatedTransform
    };
}