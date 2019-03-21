import axios from 'axios'

export const add = () => {
    return { type: 'ADD' }
}

export const add2 = (num) => {
    return { type: 'ADD2', num: num }
}

export const minus = () => {
    return { type: 'MINUS' }
}



//Get
export const getBearsSuccess = bears => ({
    type: 'GET_BEARS_SUCCESS',
    bears
});
export const getBearsFailed = () => ({ type: 'GET_BEARS_FAILED' });

export const getBears = () => async (dispatch) => {
    try {
        console.log('Get Bear New')
        const response = await axios.get(`http://localhost/api/bears`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch(getBearsSuccess(responseBody));
    } catch (error) {
        console.error(error);
        dispatch(getBearsFailed());
    }
}

//ADD
export const addbear = (bearname, weight) => async (dispatch) => {
    try {
        console.log('Add Bear New')
        if (bearname != undefined && weight != undefined) {
            await axios.post(`http://localhost/api/bears`, { name: bearname, weight: weight })
            const response = await axios.get(`http://localhost/api/bears`)
            const responseBody = await response.data;
            console.log('response: ', responseBody)
            dispatch(getBearsSuccess(responseBody))
        }
    } catch (error) {
        console.error(error);
        dispatch(getBearsFailed());
    }
}

