import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query getTransactions{
        transactions{
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;

export const GET_TRANSACTION = gql`
#  THE $id should match the variable in the resolver
    query transaction($id: ID!){
        transaction(transactionId: $id){
            _id
            userId
            description
            amount
            category
            location
            date
            paymentType
        }
    }
`;