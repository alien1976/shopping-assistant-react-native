import * as React from 'react';
import { Drawer, useTheme } from 'react-native-paper';
import { APP_IMAGES } from '../../globals/constants';
import { Image } from 'react-native';
import { useHistory, useLocation } from 'react-router-native';

const MenuDrawer = ({ drawerRef }) => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    return (
        <Drawer.Section theme={theme} style={{ height: '100%', backgroundColor: '#757575', alignContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Image source={APP_IMAGES['favicon.png']} style={{ width: 50, height: 50, marginTop: 10 }} ></Image>
            <Drawer.Item
                style={{ width: '100%' }}
                label="Home"
                active={location.pathname === '/'}
                onPress={() => { drawerRef.current.closeDrawer(); history.push('/'); }}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                label="All Products"
                active={location.pathname === '/products'}
                onPress={() => { drawerRef.current.closeDrawer(); history.push('/products'); }}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                label="All shops"
                active={location.pathname === '/shops'}
                onPress={() => { drawerRef.current.closeDrawer(); history.push('/shops'); }}
            />
        </Drawer.Section>
    );
}

export default MenuDrawer;