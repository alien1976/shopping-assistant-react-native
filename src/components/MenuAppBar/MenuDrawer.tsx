import * as React from 'react';
import { Drawer, useTheme } from 'react-native-paper';
import { APP_IMAGES } from '../../globals/constants';
import { Image } from 'react-native';
import { useHistory } from 'react-router-native';

const MenuDrawer = ({ drawerRef }) => {
    const [active, setActive] = React.useState('');
    const theme = useTheme();
    const history = useHistory();

    return (
        <Drawer.Section theme={theme} style={{ height: '100%', backgroundColor: '#757575', alignContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Image source={APP_IMAGES['favicon.png']} style={{ width: 50, height: 50, marginTop: 10 }} ></Image>
            <Drawer.Item
                style={{ width: '100%' }}
                label="Home"
                active={history.location.pathname === '/'}
                onPress={() => { setActive('Home'); drawerRef.current.closeDrawer(); history.push('/'); }}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                label="All Products"
                active={active === 'All Products'}
                onPress={() => setActive('All Products')}
            />
            <Drawer.Item
                style={{ width: '100%' }}
                label="All shops"
                active={history.location.pathname === '/shops'}
                onPress={() => { setActive('All shops'); drawerRef.current.closeDrawer(); history.push('/shops'); }}
            />
        </Drawer.Section>
    );
}

export default MenuDrawer;