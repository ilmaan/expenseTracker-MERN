const transactionTypeDef = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        amount: Float!
        category: String!
        location: String
        date: String!
    }

    type Query{
        transactions: [Transaction!]!
        transaction(transactionID: ID!): Transaction
        #  TO DO => ADD CATEGORY STATS QUERY
    }

    type Mutation {
        createTransaction(input: createTransactionInput!): Transaction
        updateTransaction(input: updateTransactionInput!): Transaction
        deleteTransaction(transactionID: ID!): Transaction!
    }

    input createTransactionInput{
        description: String!
        amount: Float!
        category: String!
        location: String
        date: String!
    }

    input updateTransactionInput{
        transactionID: ID!
        userId: ID
        description: String
        amount: Float
        category: String
        location: String
        date: String
    }




`;

export default transactionTypeDef;