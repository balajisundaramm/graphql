const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    author(name: String): Author
  }  
`;

const baseURL = ` https://demo1544854.mockable.io`
const fetch = require('node-fetch')


const books = [
    {
        title: 'The Awakening',
        author: {
            name: 'Balaji'
        },
    },
    {
        title: 'City of Glass',
        author: {
            name: 'Prithvi'
        },
    },
    {
        title: 'Half Girlfriend',
        author: {
            name: 'Prithvi'
        },
    },
];

const authors = [
    {
        name: 'balaji',
        books: [
            {
                title: 'The Awakening',
            }],
    },
    {
        name: 'Prithvi',
        books: [
            {
                title: 'City of Glass'
            }, 
            {
                title:'Half Girlfriend'
            }
        ],
    },
];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        // books: () => books,
        books: () => {
            return fetch(`${baseURL}/books`).then(res => res.json())
            // books,
        },
        authors: () => authors,
        author(_,name) {
            return authors.find(a => a.name === name.name);
        }
    },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

// const resolvers = {
//   Query: {
//     users: () => {
//       return fetch(`${baseURL}/users`).then(res => res.json())
//     },
//     user: (parent, args) => {
//       const { id } = args
//       return fetch(`${baseURL}/users/${id}`).then(res => res.json())
//     },
//     posts: () => {
//       return fetch(`${baseURL}/posts`).then(res => res.json())
//     },
//     post: (parent, args) => {
//       const { id } = args
//       return fetch(`${baseURL}/blog/posts/${id}`).then(res => res.json())
//     },
//   },
// }
