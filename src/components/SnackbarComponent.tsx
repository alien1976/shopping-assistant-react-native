import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSnackState, selectSnackMessage, closeSnackBar, selectSnackStatus } from '../redux/snackBarReducer';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const SnackbarComponent = () => {
    const opened = useSelector(selectSnackState);
    const status = useSelector(selectSnackStatus);
    const message = useSelector(selectSnackMessage);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeSnackBar())
    }

    const snackColor = React.useMemo(() => {
        switch (status) {
            case 'error': return 'red';
            case 'success': return 'green';
            case 'warning': return 'orange';
            case 'info': return 'blue';
            default: return ''
        }
    }, [opened, message, status])

    return (
        <View style={styles.container}>
            <Snackbar
                style={{ backgroundColor: snackColor }}
                visible={opened}
                onDismiss={handleClose}
                action={{
                    label: 'Close',
                    onPress: handleClose,
                }}>
                {message}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default SnackbarComponent