import * as React from 'react';
import { ImageBackground, View, Dimensions, Modal, TouchableOpacity, Text, Platform } from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
    SvgUri,
    SvgXml
} from 'react-native-svg';
// import SvgUri from 'react-native-svg-uri';
import { APP_IMAGES, SHOP_MAP_BACKGROUND } from '../../globals/constants';
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
const POINT_COLOR = 'black';
const POINT_STROKE = 'white';

const ProductLocationMap = ({ productCoordinates, mapImgUrl }: { productCoordinates: string, mapImgUrl: string }) => {
    const [x1, y1] = productCoordinates.split(',');
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const [mapWith, setMapWith] = React.useState(Dimensions.get('window').width)

    const changeMapWidth = () => {
        setMapWith(Dimensions.get('window').width)
    }

    React.useEffect(() => {
        Dimensions.addEventListener('change', changeMapWidth);

        return (() => {
            Dimensions.removeEventListener('change', changeMapWidth)
        })
    }, [])

    return (
        <>
            <View style={{ width: mapWith - mapWith * 0.024, height: 300 }}>
                <TouchableOpacity onPress={() => setDialogOpened(true)}>
                    <Svg height="100%" width="100%">
                        <SvgXml xml={SHOP_MAP_BACKGROUND} width="100%" height="100%" />
                        <Circle
                            cx={x1}
                            cy={y1}
                            r="7"
                            stroke={POINT_STROKE}
                            fill={POINT_COLOR}
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
            <Modal
                presentationStyle={'fullScreen'}
                animated
                animationType="fade"
                transparent={false}
                visible={dialogOpened}
                onDismiss={() => { setDialogOpened(false) }}
            >
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                    <TouchableOpacity onPress={() => setDialogOpened(false)}>
                        <Svg height="100%" width="100%">
                            <SvgXml xml={SHOP_MAP_BACKGROUND} width="100%" height="100%" />
                            <Circle
                                cx={x1}
                                cy={y1}
                                r="7"
                                stroke={POINT_STROKE}
                                fill={POINT_COLOR}
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

export default ProductLocationMap;