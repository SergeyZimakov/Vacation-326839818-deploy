import axios from 'axios';

export const get = async (url, parametr) => {
    const fullUrl = parametr ? `${url}/${parametr}` : `${url}`
    try {
        const result = await fetch(fullUrl)
        const response = await result.json()
        if (result.status !== 200) {
            return {error: response.error};
        }
        return {data: response.data};
    }
    catch(err) {
        return ({error: [err]});
    }
}

export const post = async (url, body) => {
    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
        const response = await result.json()
        if (result.status !== 200) {
            return {error: response.error};
        }
        return {data: response.data};
    }
    catch(err) {
        return ({error: [err]});
    }
}

export const deleteReq = async (url, body) => {
    try {
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        const response = await result.json()
        if (result.status !== 200) {
            return {error: response.error};
        }
        return {data: response.data};
    }
    catch(err) {
        return ({error: [err]});
    }
}


export const axiosPost = async (url, body) => {
    try {
        const response = await axios.post(url, body);
        return {data: response.data}
    }
    catch(err) {
        return ({error: [err]});
    }
}