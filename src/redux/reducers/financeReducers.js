import {
    RECEIPT_LIST_REQUEST, RECEIPT_LIST_SUCCESS, RECEIPT_LIST_FAIL,
    RECEIPT_DETAILS_REQUEST, RECEIPT_DETAILS_SUCCESS, RECEIPT_DETAILS_FAIL,
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
