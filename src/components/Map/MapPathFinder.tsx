import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectFastestPath } from '../../redux/cartReducer';
import { ActivityIndicator } from 'react-native-paper';
import { View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Svg, { SvgXml, Circle, G, Line, Text } from 'react-native-svg';
import { SHOP_MAP_BACKGROUND } from '../../globals/constants';

const POINT_COLOR = 'black';
const POINT_STROKE = '#ff1a1a';
const ANCHOR_POINT_COLOR = 'white';
const ANCHOR_POINT_STROKE = '#cccccc'
const PRODUCT_COLOR = '#cc0000';
const START_POINT_STROKE = 'white'
const START_POINT_COLOR = '#208000';
const PATH_LINE_FILL_COLOR = '#6699ff';
const PATH_LINE_STROKE_COLOR = '#6699ff';

interface IMapPathFinder {
    products: string[]
    mapImgUrl: string
    loadProcess: boolean
    startPoint: string
}

const MapPathFinder = ({ products, mapImgUrl, loadProcess, startPoint }: IMapPathFinder) => {
    const fastestPath = useSelector(selectFastestPath);
    const [routeScale, setRouteScale] = React.useState(7);
    const svgRef = React.useRef(null);
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const [mapWith, setMapWith] = React.useState(Dimensions.get('window').width)

    const changeScaleFactor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changeFactor = parseInt(event.target.value);
        setRouteScale(changeFactor)
    }

    let stopCnt = 1;

    const loading = loadProcess;
    const mapStyles = React.useMemo(() => {
        return {
            background: 'black no-repeat center top',
            backgroundSize: 'cover',
            //@ts-ignore
            position: 'relative' as PositionProperty,
            backgroundImage: `url(${mapImgUrl})`,
            width: `100%`,
            height: `100%`,
            filter: loading ? 'blur(2.5px)' : '',
            opacity: loading ? '0.5' : '1',
            //@ts-ignore
            pointerEvents: loading ? 'none' as PointerEventsProperty : '' as PointerEventsProperty
        }
    }, [mapImgUrl, loading])

    const loaderStyles = React.useMemo(() => {
        return {
            width: '15%',
            height: '15%',
            marginBottom: '10px'
        }
    }, [])

    const [startX, startY] = startPoint.split(',');

    const changeMapWidth = () => {
        setMapWith(Dimensions.get('window').width)
    }

    React.useEffect(() => {
        Dimensions.addEventListener('change', changeMapWidth);

        return (() => {
            Dimensions.removeEventListener('change', changeMapWidth)
        })
    }, [])

    const mapSvg = React.useMemo(() => {
        const drawnPoints: string[] = [];
        const drawnLines: string[] = [];

        return (
            <View style={{ width: '100%', height: '100%' }}>
                <SvgXml style={{ position: 'absolute' }} xml={SHOP_MAP_BACKGROUND} width="100%" height="100%" />
                <Svg height="100%" width="100%" viewBox="0 0 500 488">
                    <G>
                        {fastestPath.map((value, index) => {
                            if (value === undefined) return null;
                            if (!fastestPath[index + 1]) return null;
                            if (drawnLines.indexOf(value + ',' + fastestPath[index + 1]) !== -1) return null;
                            drawnLines.push(value + ',' + fastestPath[index + 1]);
                            const [x1, y1] = value.split(',');
                            const [x2, y2] = fastestPath[index + 1].split(',');
                            const anchorPointsRadius = routeScale - (4 * 2);

                            return (
                                <React.Fragment key={'shortest-path-(' + value + ',' + fastestPath[index + 1] + ')'}>
                                    <Line x1={x1} x2={x2} y1={y1} y2={y2} strokeLinecap="round" fill={PATH_LINE_FILL_COLOR} stroke={PATH_LINE_STROKE_COLOR} strokeWidth={routeScale - 4}></Line>
                                    {products.indexOf(value) === -1 && <Circle cx={x1} cy={y1} r={anchorPointsRadius > -1 ? anchorPointsRadius : 0} fill={ANCHOR_POINT_COLOR} stroke={ANCHOR_POINT_STROKE}></Circle>}
                                </React.Fragment>
                            )
                        })}
                    </G>
                    <Circle cx={startX} cy={startY} r={routeScale + 4} fill={START_POINT_COLOR} stroke={START_POINT_STROKE}></Circle>
                    <G>
                        {fastestPath.map((value, index) => {
                            if (value === undefined) return null;
                            if (drawnPoints.indexOf(value) !== -1) return null;
                            drawnPoints.push(value);
                            const [x1, y1] = value.split(',');
                            return (
                                <React.Fragment key={'products-path-(' + x1 + ',' + y1 + ')'}>
                                    {products.indexOf(value) !== -1 &&
                                        (<>
                                            <Circle cx={x1} cy={y1} r={routeScale + 2} fill={PRODUCT_COLOR} stroke={POINT_STROKE}></Circle>
                                            <Text x={x1} y={y1} fontSize={routeScale * 2} textAnchor="middle" fill="white" dy=".35em">{stopCnt++}</Text>
                                        </>)}
                                </React.Fragment>
                            )
                        })}
                    </G>
                </Svg>
            </View>)
    }, [fastestPath, products])

    if (loading)
        return (<View style={{ width: mapWith - mapWith * 0.024, height: 300, alignItems: 'center', justifyContent: 'center' }}>
            {mapSvg}
            <View style={{ width: mapWith - mapWith * 0.024, height: 300, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator animating={true} color='orange' size='large' />
            </View>
        </View>)

    return (
        <>
            <View style={{ width: mapWith - mapWith * 0.024, height: 300 }}>
                <TouchableOpacity onPress={() => setDialogOpened(true)}>
                    {mapSvg}
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
                        {mapSvg}
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

export default React.memo(MapPathFinder);