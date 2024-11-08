import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {

    Mutation: {
        // SIGNUP FUNCTION
        signUp: async(_,{input},context) => {
            try{
                console.log("SIGNUP INPUT--->");
                const {username,name,password,gender} = input;

                if (!username || !name || !password || !gender) {
                    throw new Error('Please fill in all fields');
                }
                const existingUser = await User.findOne({username});

                if (existingUser){
                    throw new Error('Username already exists');
                }
                

                // TO HASH PASSWORDS SO THAT IT IS NOT READABLE  10 defines len of hashed password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // https://avatar.iran.liara.run/public/boy?username=Scott

                const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?username='+username;
                const girlProfilePic = 'https://avatar.iran.liara.run/public/boy?username='+username;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
                })

                await newUser.save();
                await context.login(newUser);

                return newUser;


            }
            catch (err){
                console.log("ERRIR IN SIGNUP:",err)
                throw new Error(err.message || "Internal server ERROR--->>>" );
            }
        },

        

        // LOGIN FUNCTION
        login : async(_,{input},context) =>{
            try{
                const {username,password} = input;
                
                const {user} = await context.authenticate("graphql-local",{username,password});

                await context.login(user);
                return user;

            }
            catch (err){
                console.log("ERROR IN LOGIN FUNCT--->:",err)
                throw new Error(err.message || "Internal server ERROR--->>>" );

            }

        },

        // LOGOUT FUNCTION
        logout:async(_,__,context) =>{
            try{
                await context.logout();
                context.req.session.destroy((err) =>{
                    if(err) throw err;
                        
                });
                context.res.clearCookie("connect.sid");
                return {message: "Logged out succesfully"};

            }
            catch (err){
                console.log("ERROR IN LOGOUT FUNCT--->:",err)
                throw new Error(err.message || "Internal server ERROR--->>>" );
                }
            


        },

    },



    Query: {

        authUser: async(_,__,context) => {
            try{
                const user = await context.getUser();
                return user;

        }
        catch (err){
            console.log("ERROR IN AUTHUSER FUNCT--->:",err);
            throw new Error(err.message || "Internal server ERROR--->>>" );
        }
        },

        user: async(_,{userId}) =>{
            try{
                const user = await User.findById(userId);
                return user;
                }
            catch (err){
                console.log("ERROR IN USER QUERY FUNCT--->:",err);
                throw new Error(err.message || "Internal server ERROR USER QUERY--->>>" );
                }
        },
        
        // NOT NEEDING TO SHOW ALL USERS ( NON AUTHENTICATED USERS)
        // users: (_,_,{req,res})=> {
        //     return users;
        // },

        // user:(_, {userId}) => {
        //     return users.find((user) => user._id === userId);
        // },
    },

    // Mutation: {}

    // TODO => ADD USER/TRANSACTION RELATIONSHIP

};

export default userResolver;

