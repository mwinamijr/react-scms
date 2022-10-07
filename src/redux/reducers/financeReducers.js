import {
    RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_LIST_FAIL,
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL,
    PAYMENT_LIST_REQUEST, PAYMENT_LIST_SUCCESS, PAYMENT_LIST_FAIL,
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