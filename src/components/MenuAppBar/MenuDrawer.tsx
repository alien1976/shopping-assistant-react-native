import * as React from 'react';
import { Drawer, useTheme } from 'react-native-paper';
import { APP_IMAGES } from '../../globals/constants';
import { Image } from 'react-native';

const MenuDrawer = () => {
    const [active, setActive] = React.useState('');
    const theme = useTheme();

    return (
        <Drawer.Section theme={theme} accessibilityStates={false} style={{ alignContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Image source={APP_IMAGES['favicon.png']} style={{ width: 50, height: 50, marginTop: 10 }} ></Image>
            <Drawer.Item
                style={{ width: '100%' }}
                accessibilityStates={false}
                label="Home"
                active={active === 'Home'}
                onPress={() => setActive('Home')}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                accessibilityStates={false}
                label="All Products"
                active={active === 'All Products'}
                onPress={() => setActive('All Products')}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                accessibilityStates={false}
                label="All shops"
                active={active === 'All shops'}
                onPress={() => setActive('All shops')}
            />
        </Drawer.Section>
    );
}

export default MenuDrawer;