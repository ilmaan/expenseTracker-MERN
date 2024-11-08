import possport from "passport";

import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";

export const configurePassport = async () => {
    passport.serializeUser((user, done) => {
        console.log("SERIALIZING USER-----------------");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("DESERIALIZING USER-----------------");
        try {
            const user = await User.findById(id);
            done(null, user);
        }
        catch(err){
            console.log(err);
            done(err);
        };
    });

    // 123456 = $ilman786$

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new Error("INVALID USERNAME OR PASSWORD");
                    // return done(null, false, { message: 'Invalid username or password' });
                    }
                    const validPassword = await bcrypt.compare(password,user.password);
                    if (!validPassword) {
                        throw new Error("INVALID USERNAME OR PASSWORD----");
                    }

                    return done(null,user);
            }
            catch(err){
                console.log(err);
                return done(err);
            }
        })
    )
}