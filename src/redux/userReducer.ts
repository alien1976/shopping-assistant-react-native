import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { IStoreState } from './store';
import { userService } from '../services/users.service';
import { openSnackBar } from './snackBarReducer';
import { IUser } from '../globals/interfaces';
// import { logout } from './authenticationReducer';

//reducers
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        updatingUser: false,
        deletingUser: false,
        gettingUserData: false,
        user: {} as IUser
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUpdatingUser: (state, action) => {
            state.updatingUser = action.payload === undefined ? false : action.payload;
        },
        setGettingUserData: (state, action) => {
            state.gettingUserData = action.payload === undefined ? false : action.payload;
        },
        setDeletingUser: (state, action) => {
            state.deletingUser = action.payload === undefined ? false : action.payload;
        }
    }
});

//actions
export const { setUser, setUpdatingUser, setGettingUserData, setDeletingUser } = userSlice.actions;

export const getUserData = (userId: string) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(setGettingUserData(true));
    try {
        const userData = await userService.getUserById(userId);
        dispatch(setGettingUserData(false));
        dispatch(setUser(userData));
    } catch (error) {
        dispatch(setGettingUserData(false));
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const updateUserData = (user: IUser) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(setUpdatingUser(true));

    try {
        await userService.updateUser(user);
        dispatch(setUpdatingUser(false));
        dispatch(setUser(user))
        dispatch(openSnackBar({ message: `Successfully updated user data!`, status: 'success' }));
    } catch (error) {
        dispatch(setUpdatingUser(false));
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const addProductToFavorites = (productId: string) => async (dispatch: React.Dispatch<AnyAction>, getState: any) => {
    const user = { ...getState().userState.user };

    if (!user.favoriteProducts) user.favoriteProducts = [];
    if (user.favoriteProducts.indexOf(productId) !== -1) return;

    user.favoriteProducts = user.favoriteProducts.concat([productId]);

    try {
        await userService.updateUser(user);
        dispatch(setUser(user))
        dispatch(openSnackBar({ message: `Added to favorites!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const removeProductFromFavorites = (productId: string) => async (dispatch: React.Dispatch<AnyAction>, getState: any) => {
    const user = { ...getState().userState.user } as IUser;

    if (!user.favoriteProducts || !user.favoriteProducts.length) return;

    user.favoriteProducts = user.favoriteProducts.filter((el) => el !== productId)

    try {
        await userService.updateUser(user);
        dispatch(setUser(user))
        dispatch(openSnackBar({ message: `Removed product from favorites!`, status: 'success' }));
    } catch (error) {
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

export const deleteUser = (userId: string) => async (dispatch: React.Dispatch<AnyAction>) => {
    dispatch(setDeletingUser(true));

    try {
        await userService.deleteUser(userId);
        dispatch(setDeletingUser(false));
        // dispatch(logout());
        dispatch(setUser({}))
        dispatch(openSnackBar({ message: `Successfully deleted user account!`, status: 'success' }));
    } catch (error) {
        dispatch(setDeletingUser(false));
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
};

//selectors
export const selectUser = (state: IStoreState) => state.userState.user;
export const selectUserRole = (state: IStoreState) => state.userState.user && state.userState.user.role;
export const selectUpdatingUser = (state: IStoreState) => state.userState.updatingUser;
export const selectUserFavoritesProducts = (state: IStoreState) => state.userState.user.favoriteProducts;

export default userSlice.reducer;