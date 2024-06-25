import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id:ID
        username: String
    }
    type Tweet {
        id:ID
        text:String
        author: User
    }
    type Query {
        allTweets: [Tweet]
        tweet(id: ID): Tweet
    }
`
//type Query is mandatory
/*
type Query {
        text: String
        hello: String
        allFilm: X
        film: X
    }
*/
//GET /test Get/hello Get/allFilm Get/film

const server = new ApolloServer({ typeDefs })

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})