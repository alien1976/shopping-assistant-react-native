import { authHeader, handleResponse } from "../utils/utils";
import { IUser } from '../globals/interfaces';
import { SA_API_BASE } from "../globals/constants";
import AsyncStorage from '@react-native-community/async-storage';

const login = async (userName: string, password: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    const response = await fetch(`${SA_API_BASE}/auth/login`, requestOptions);
    const user = await handleResponse(response);
    await AsyncStorage.setItem('user', JSON.stringify(user))
    return user;
}

const logout = async () => {
    await AsyncStorage.removeItem('user')
}

const getAllUsers = async () => {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users`, requestOptions);
    return await handleResponse(response, logout);
}

const getUserById = async (id: string) => {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users/${id}`, requestOptions)
    return await handleResponse(response, logout);
}

const registerUser = async (user: IUser) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = fetch(`${SA_API_BASE}/auth/register`, requestOptions)
    return await handleResponse(response, logout);
}

const updateUser = async (user: IUser) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = fetch(`${SA_API_BASE}/users/${user.id}`, requestOptions)
    return await handleResponse(response, logout);
}

const deleteUser = async (userId: string) => {
    const requestOptions = {
        method: 'DELETE',
        headers: await authHeader()
    };

    const response = fetch(`${SA_API_BASE}/users/${userId}`, requestOptions)
    return await handleResponse(response, logout);
}

export const userService = {
    login: login,
    logout: logout,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    registerUser: registerUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};
