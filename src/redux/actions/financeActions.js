import axios from "axios";
import {
    RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_LIST_FAIL, 
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL, 
} from '../constants/financeConstants'

export const listReceipts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: RECEIPT_LIST_REQUEST })
        
        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://127.0.0.1:8000/api/finance/receipts/', config)

        dispatch({
            type: RECEIPT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECEIPT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const ReceiptsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RECEIPT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/api/finance/receipts/${id}`, config)

        dispatch({
            type: RECEIPT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: RECEIPT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
