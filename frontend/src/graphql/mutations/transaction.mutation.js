import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation createTransaction($input: createTransactionInput!){
	createTransaction(input: $input){
		_id
		description
		amount
		date
		category
		location
	}
}
`;

export const UPDATE_TRANSACTION = gql`
    mutation updateTransaction($input: updateTransactionInput!){
        updateTransaction(input: $input){
            _id
            description
            paymentType
            amount
            category
            location
            date
        }
    }
`;

export const DELETE_TRANSACTION = gql`
    mutation deleteTransaction($transactionID: ID!){
        deleteTransaction(transactionID: $transactionID){
            _id
        }
    }
`;

