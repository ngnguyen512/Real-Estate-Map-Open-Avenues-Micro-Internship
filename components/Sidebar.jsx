import TaxAssessors from "./PropertyCard/apolloclient";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.eng.meridiancapital.com/graphql',
  cache: new InMemoryCache(),
});

function Sidebar() {
    return(
        <>
        <div className="sidebar">
            <ApolloProvider client={client}>
            <div >
				<TaxAssessors/>
			</div>
            </ApolloProvider>
			
		</div>
        </>
    )
}
export default Sidebar; 

