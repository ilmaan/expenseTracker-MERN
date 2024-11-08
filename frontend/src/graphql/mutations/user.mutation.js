import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			# _id
			username
			gender
			password
		}
	}
`;


export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            id
            username
            password
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout{
            message 
        }
    }
`;