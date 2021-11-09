const { ApolloServer,  gql  } = require('apollo-server');
const fs  = require('fs');

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}));
const resolvers = require('./resolvers')
const UserAPI = require('./user-api')

// const typeDefs = gql`
//     schema {
//         query: Query
//     }
//     type Query {
//         greeting: String
//     }
// `;

// const resolvers = {
//     Query: {
//         greeting: () => 'Hello graphQL world!'
//     }
// };

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    dataSources: () => {
        return {
            userAPI: new UserAPI()
        };
    },
    tracing: true});
server.listen({port: 9000})
    .then(({url}) => console.log('server running at ' + url));
