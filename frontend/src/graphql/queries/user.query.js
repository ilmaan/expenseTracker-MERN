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

export const GET_USER = gql`
	query getUser($userId: ID!) {
		user(userId: $userId) {
			transactions {
				_id
				name
				username
				profilePicture
				transactions {
					_id
					description
					paymentType
					category
					amount
					location
					date
				}
			}
		}
	}
`;
