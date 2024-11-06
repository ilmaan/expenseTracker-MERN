import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import GridBackground from './components/ui/GridBackground.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
	// TDO => Update the uri on production
	uri: 'http://localhost:4000/graphql', // The URL of the GraphQL server
	cache: new InMemoryCache(), // Apollo client uses to cache query results after fetching them
	credentials: 'include',  // This tells apollo to send cookies to the server with every request
});



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<GridBackground>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</GridBackground>
		</BrowserRouter>
	</React.StrictMode>
);




// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <GridBackground>
//           <App />
//       </GridBackground>
//     </BrowserRouter>
//   </StrictMode>,
// )


// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<GridBackground>
// 				<App />
// 			</GridBackground>
// 		</BrowserRouter>
// 	</React.StrictMode>
// );



