import {
    RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_LIST_FAIL,
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL,
    RECEIPT_CREATE_REQUEST, RECEIPT_CREATE_SUCCESS, RECEIPT_CREATE_FAIL, RECEIPT_CREATE_RESET,
    PAYMENT_LIST_REQUEST, PAYMENT_LIST_SUCCESS, PAYMENT_LIST_FAIL,
    PAYMENT_DETAILS_REQUEST, PAYMENT_DETAILS_SUCCESS, PAYMENT_DETAILS_FAIL,
    PAYMENT_CREATE_REQUEST, PAYMENT_CREATE_SUCCESS, PAYMENT_CREATE_FAIL, PAYMENT_CREATE_RESET,
} from '../constants/financeConstants'

export const receiptListReducer = (state = { receipts: [] }, action) => {
    switch (action.type) {
        case RECEIPT_LIST_REQUEST:
            return { loading: true, receipts: [] }

        case RECEIPT_LIST_SUCCESS:
            return {
                loading: false,
                receipts: action.payload,
            }

        case RECEIPT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const receiptDetailsReducer = (state = { receipt: [] }, action) => {
    switch (action.type) {
        case RECEIPT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case RECEIPT_DETAILS_SUCCESS:
            return { loading: false, receipt: action.payload }

        case RECEIPT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const receiptCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIPT_CREATE_REQUEST:
            return { loading: true }

        case RECEIPT_CREATE_SUCCESS:
            return { loading: false, success: true, receipt: action.payload }

        case RECEIPT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case RECEIPT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const paymentListReducer = (state = { payments: [] }, action) => {
    switch (action.type) {
        case PAYMENT_LIST_REQUEST:
            return { loading: true, payments: [] }

        case PAYMENT_LIST_SUCCESS:
            return {
                loading: false,
                payments: action.payload,
            }

        case PAYMENT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const paymentDetailsReducer = (state = { payment: [] }, action) => {
    switch (action.type) {
        case PAYMENT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PAYMENT_DETAILS_SUCCESS:
            return { loading: false, payment: action.payload }

        case PAYMENT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const paymentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PAYMENT_CREATE_REQUEST:
            return { loading: true }

        case PAYMENT_CREATE_SUCCESS:
            return { loading: false, success: true, payment: action.payload }

        case PAYMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PAYMENT_CREATE_RESET:
            return {}

        default:
            return state
    }
}
