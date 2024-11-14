import { useQuery } from "@apollo/client";
import Card from "./card.jsx";

import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { GET_USER } from "../../graphql/queries/user.query";
import { GET_AUTH_USER } from "../../graphql/queries/user.query";



const Cards = () => {

	const { data, loading, error } = useQuery(GET_TRANSACTIONS);
	console.log("data------TRANSACTIONS---->>>", data);
	

	const {data: authUser} = useQuery(GET_AUTH_USER);
	console.log("authUser----<><><><><->>>", authUser?.authUser?.id);
	

	const {data: user, loading: userLoading} = useQuery(GET_USER,
		{
			variables: {
				userId: authUser?.authUser?.id
			}
		}
	);
	console.log("user---)))))))))))))---->>>", user);

	if(error) return <p>Error: {error.message}</p>;
	
	

	


 

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map((transaction) =>(
					<Card key={transaction._id} transaction={transaction} />
				) ) }

				
				{/* <Card cardType={"saving"} />
				<Card cardType={"expense"} />
				<Card cardType={"investment"} />
				<Card cardType={"investment"} />
				<Card cardType={"saving"} />
				<Card cardType={"expense"} /> */}
			</div>
			{!loading && data?.transaction?.length === 0 && (
				<p className='text-center text-2xl'>No transactions found</p>
			)}


		</div>
	);
};
export default Cards;