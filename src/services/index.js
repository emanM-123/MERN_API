import axios from "axios";
import { serializeObjectToQuery } from '../../src/helper';
const baseUrl = "http://localhost:3113";
const token = JSON.parse(localStorage.getItem('token'));
console.log(token);

export const createNewUser = async (data) => {
    try {
        return await axios.post(`${baseUrl}/users`, data)
    } catch (err) {
        return err.response;
    }
}
export const loginUser = async (data) => {
    try {
        return await axios.post(`${baseUrl}/authentication`, data)
    } catch (err) {
        return err.response;
    }
}

export const login = async (data) => {
    try {
        return await axios.post(`${baseUrl}/login`, data)
    } catch (err) {
        return err.response;
    }
}

export const createTask = async (data) => {
    try {
        return await axios.post(`${baseUrl}/task`, data,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        },)
    } catch (err) {
        return err.response;
    }
}

export const getAllTask = async ({ ...otherQuery }) => {
    try {
        return await axios.get(`${baseUrl}/task${serializeObjectToQuery(otherQuery)}&$sort[dueDate]=-1`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
    } catch (err) {
        return err.response;
    }
}

export const editTask = async ({ _id, ...otherData }) => {
    return await axios.patch(
        `${baseUrl}/task/${_id}`,
        otherData,{
            headers: {
                Authorization: `Bearer ${token}`
              }
        },
    ).then((response) => {
        return { data: response.data };
    });
};