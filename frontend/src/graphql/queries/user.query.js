import { gql } from '@apollo/client';

export const GET_AUTH_USER = gql`
	query getAuthUser {
		authUser {
			id
			username
			name
			password
			gender
			profilePicture
			
		}
	}
`;
