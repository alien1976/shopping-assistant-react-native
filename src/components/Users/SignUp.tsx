import * as React from 'react';
import { IUser } from '../../globals/interfaces';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authenticationReducer';
import { ScrollView, View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Title, TextInput, Button } from 'react-native-paper';
import { styles } from '../../globals/constants';
import { Link } from 'react-router-native';
import { openSnackBar } from '../../redux/snackBarReducer';

const SignUp = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const onSubmit = () => {
        if (firstName && lastName && userName && password && email) {
            dispatch(registerUser({ firstName, lastName, userName, password, email, role: "User" } as IUser));
        } else {
            dispatch(openSnackBar({ message: 'Fill all the fields!', status: 'warning' }))
        }
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
                <Icon name="pencil-square" size={25}></Icon>
                <Title>Sign up</Title>
                <TextInput
                    style={styles.userInput}
                    label="First Name"
                    value={firstName}
                    onChangeText={(name) => setFirstName(name)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.userInput}
                    label="Last Name"
                    value={lastName}
                    onChangeText={(name) => setLastName(name)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.userInput}
                    label="Email Address"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.userInput}
                    label="User name"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    mode="outlined"
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.userInput}
                    label="Password"
                    value={password}
                    onChangeText={(pass) => setPassword(pass)}
                    mode="outlined"
                />
                <View style={{ marginTop: 10 }}>
                    <Button style={{ marginBottom: 10 }} icon="arrow-right" mode="contained" onPress={onSubmit}>
                        Sign In
                    </Button>
                    <Link to="/login" component={TouchableHighlight}>
                        <Text>"Already have an account? Sign in"</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

export default SignUp;