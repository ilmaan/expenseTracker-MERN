const transactionTypeDef = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        amount: Float!
        category: String!
        location: String
        date: String!
        paymentType: String!
    }

    type Query{
        transactions: [Transaction!]!
        transaction(transactionId: ID!): Transaction
        #  TO DO => ADD CATEGORY STATS QUERY
        categoryStats: [CategoryStats!]!
    }

    type Mutation {
        createTransaction(input: createTransactionInput!): Transaction
        updateTransaction(input: updateTransactionInput!): Transaction
        deleteTransaction(transactionId: ID!): Transaction!
    }

    type CategoryStats {
        category: String!
        amount: Float!
    }

    input createTransactionInput{
        description: String!
        amount: Float!
        category: String!
        location: String
        date: String!
        paymentType: String!
    }

    input updateTransactionInput{
        _id: ID
        transactionId: ID
        userId: ID
        description: String
        amount: Float
        category: String
        location: String
        date: String
        paymentType: String
    }




`;

export default transactionTypeDef;