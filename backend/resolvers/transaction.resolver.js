import { transactions } from "../dummyData/data.js";
import Transaction from "../models/transaction.model.js";

const transactionResolver = {
    
    Query: {
        transactions: async (_,__,context) =>{
            try{
                if (!context.getUser()) throw new Error("UNAUTHORIZED ACCESS STOP PLAYING FOO")
                
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({userId});
                return transactions;

            }
            catch (err){
                console.log('ERROR IN TRANSACTION -->',err);
                throw new Error("ERROR GETTING TRANSACTION")
                    
            }
        },
        transaction:  async (_,{transactionId},context) =>{
        try{
            const transaction = await Transaction.findById(transactionId);
            return transaction;

        }
        catch (err){
            console.log('ERROR IN TRANSACTION ONE -->',err);
            throw new Error("ERROR GETTING TRANSACTION ONE")
        }
        
        }

    },
    

    // TO DO => ADD CATEGORY STATS QUERY

    Mutation: {
        createTransaction: async (_, {input},context) =>{
            try{
                const newTransaction = new Transaction({
                    ...input, //SPREAD USING ...input else we can use date:input.date, location:input.location etc
                    userId: context.getUser()._id
                })

                await newTransaction.save();
                return newTransaction;

            }
            catch (error){
                console.log('ERROR IN TRANSACTION CREATE -->',error);
                throw new Error("ERROR CREATING TRANSACTION")
            }

        },

        updateTransaction: async (_, {input},context) =>{
            try{
                const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true}); // new give object after the update is app;ied
                return updateTransaction;

            }
            catch (err){
                console.log('ERROR IN TRANSACTION UPDATE -->',err);
                throw new Error("ERROR UPDATING TRANSACTION")
            }

        },
        
        deleteTransaction: async (_, {transactionId},context) =>{
            try{
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction;
                }
            catch (err){
                console.log('ERROR IN TRANSACTION DELETE -->',err);
                throw new Error("ERROR DELETING TRANSACTION")
                }
        },

        deleteTransaction: async (_, {transactionID},context) => {
            try{
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionID);
                if (!deleteTransaction) {
                    throw new Error("Transaction not found");
                }
                return deleteTransaction;
            }
            catch (err){
                console.log('ERROR IN TRANSACTION DELETE -->',err);
                throw new Error("ERROR DELETING TRANSACTION")
            }
        },
    
    },



    // TO DO => ADD TRANSACTION USER RELATIONSHIP

};

export default transactionResolver;
