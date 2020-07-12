import * as React from 'react';
import { logUserIn, selectLoggedIn } from '../../redux/authenticationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, Link, Redirect } from 'react-router-native';
import { View, ScrollView, SafeAreaView, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Title, TextInput, Button, Text } from 'react-native-paper';
import { styles } from '../../globals/constants';

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector(selectLoggedIn)
    const [userName, setUserName] = React.useState('');
    const [userNameError, setUserNameError] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')

    const { from } = location.state as { from: { pathname: string } } || { from: { pathname: "/" } };

    const onUserNameChange = (value) => {
        if (value !== undefined) {
            setUserName(value)
        }
    }

    const onPasswordChange = (value) => {
        if (value !== undefined) {
            setPassword(value)
        }
    }

    const login = () => {
        if (!userName) {
            setUserNameError('User name should not be empty!')
            return;
        }

        setUserNameError('')

        if (!password) {
            setPasswordError('Password should not be empty!')
            return;
        }

        setPasswordError('')
        dispatch(logUserIn(userName, password, from.pathname))
    };

    if (isLoggedIn) {
        return <Redirect to={from} />;
    }

    return (
        <ScrollView>
            <View style={{
                marginTop: 5,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <Icon name="lock" size={25}></Icon>
                <Title >Sign in</Title>
                <TextInput
                    style={styles.userInput}
                    label="User name"
                    value={userName}
                    onChangeText={onUserNameChange}
                    mode="outlined"
                    error={userNameError !== ''}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.userInput}
                    label="Password"
                    value={password}
                    onChangeText={onPasswordChange}
                    mode="outlined"
                    error={passwordError !== ''}
                />
                <View style={{ marginTop: 10 }}>
                    <Button style={{ marginBottom: 10 }} icon="arrow-right" mode="contained" onPress={login}>
                        Sign In
                        </Button>
                    <Link to="/sign-up" component={TouchableHighlight}>
                        <Text>"Don't have an account? Sign Up"</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}

export default React.memo(Login);