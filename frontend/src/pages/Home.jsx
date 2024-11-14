import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import Cards from "../components/ui/Cards";
import Cards from "../components/ui/Cards";
import TransactionForm from "../components/ui/TransactionForm";

import { MdLogout } from "react-icons/md";

import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import { GET_CATEGORY_STATS } from "../graphql/queries/transaction.query";

import { useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
	const [logout, { loading, error,client }] = useMutation(LOGOUT, {
		refetchQueries: [GET_AUTH_USER],
	});
	
	const {data: categoryStats, refetch} = useQuery(GET_CATEGORY_STATS);
	const {data: authUser} = useQuery(GET_AUTH_USER);


	console.log("authUser----->>>", authUser);


	console.log("categoryStats----->>>", categoryStats);
	
	const chartData = {
		// labels: ["Saving", "Expense", "Investment"],
		labels: categoryStats?.categoryStats?.map(stat => stat.category) || [],
		datasets: [
			{
				label: "%",
				// data: [13, 8, 3],
				data: categoryStats?.categoryStats?.map(stat => stat.amount) || [],

				backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)", "rgba(255, 206, 86)", ],
				borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
				borderWidth: 1 ,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	};


	const handleLogout = async () => {
		console.log("Logging out...");
		try{
			await logout();
			// navigate("/login");
			// CLEAR THE APOLLO CACHE
			// client.clearStore();
			toast.success("Logged out successfully");
			client.resetStore();
		}catch(error){
			console.log("Error logging out:", error);
			toast.error(error.message);
		}
	};

	// const loading = false;

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Spend wisely, track wisely
					</p>
					<img
						// src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						src={authUser?.authUser?.profilePicture}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;