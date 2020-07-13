import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SLIDER_WIDTH } from '../../globals/constants';
import { Title } from 'react-native-paper';
import { useLoaded } from '../../utils/customHooks';

const styles = StyleSheet.create({
    contentTitle: {
        overflow: 'hidden',
        width: '100%',
        textAlign: 'center',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    productsGrid: {
        display: "flex",
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    carouselContainer: {
        marginTop: 50
    },
})

const CarouselComponent = ({ title, data, renderItem }) => {
    const [sliderWidth, setSliderWidth] = React.useState(SLIDER_WIDTH);
    const [itemWidth, setItemWidth] = React.useState(SLIDER_WIDTH * 0.7);

    const onLayoutChange = () => {
        setSliderWidth(Dimensions.get('window').width)
        setItemWidth(Dimensions.get('window').width * 0.7)
    }

    const loaded = useLoaded();

    if (!loaded) return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating={true} size='large' />
        </View>
    )

    return (
        <View onLayout={onLayoutChange}>
            <View style={styles.contentTitle}>
                <Title style={{ color: 'white', marginBottom: 10 }}>{title}</Title>
            </View>
            <View style={styles.productsGrid}>
                <Carousel
                    layout={'default'}
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </View>
        </View>
    )
}

export default CarouselComponent;