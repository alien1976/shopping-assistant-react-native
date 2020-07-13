import * as React from 'react';

import { IUser } from '../../globals/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserData, deleteUser } from '../../redux/userReducer';
import { ScrollView, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Title, TextInput, Button, Subheading } from 'react-native-paper';
import { styles } from '../../globals/constants';
import { openSnackBar } from '../../redux/snackBarReducer';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [userName, setUserName] = React.useState(user.userName);
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [email, setEmail] = React.useState(user.email);

    React.useEffect(() => {
        setUserName(user.userName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }, [user]);

    const onSubmit = () => {
        if (firstName && lastName && userName && email) {
            dispatch(updateUserData({ ...user, firstName, lastName, userName, password: password ? password : user.password, email } as IUser));
        } else {
            dispatch(openSnackBar({ message: 'All fields should not be emtpy!', status: 'warning' }))
        }
    }

    const onDelete = () => {
        return Alert.alert(
            "Are you sure you want to delete your profile?",
            "This action cannot be undone and your accout will be permanently deleted!",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: () => dispatch(deleteUser(user.id))
                }
            ],
            { cancelable: false }
        )
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
                <Icon name="id-badge" size={25}></Icon>
                <Title>User profile</Title>
                <Subheading>User: {user.userName}</Subheading>
                <Subheading>Your role: {user.role}</Subheading>
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
                    secureTextEntry={true}
                    style={styles.userInput}
                    label="Password"
                    value={password}
                    onChangeText={(pass) => setPassword(pass)}
                    mode="outlined"
                />
                <View style={{ marginTop: 10 }}>
                    <Button style={{ marginBottom: 10 }} icon="arrow-right" mode="contained" onPress={onSubmit}>
                        Save
                    </Button>
                    <Button style={{ marginBottom: 10 }} icon="arrow-right" mode="contained" onPress={onDelete}>
                        Delete account
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

export default Profile;