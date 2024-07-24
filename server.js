import { ApolloServer, gql } from "apollo-server";

let tweets = [
    {
        id:"1",
        text:"hello first",
        userId:"2"
    },
    {
        id:"2",
        text:"hello second",
        userId:"1"
    }
]

let users = [
    {
        id:"1",
        firstName:"brad",
        lastName:"kim"
    },
    {
        id:"2",
        firstName:'iron',
        lastName:'man'
    }
]

const typeDefs = gql`
    type User {
        id:ID!
        fullName: String!
        firstName: String!
        lastName: String!
    }
    type Tweet {
        id:ID!
        text:String!
        author:User
    }
    type Query {
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(text:String!, userId: ID!): Tweet!
        deleteTweet(id:ID!): Boolean!  
    }
`

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        allUsers() {
            console.log("all user called")
            return users;
        },
        tweet(root, {id}){            
            return tweets.find((tweet)=> tweet.id ===id); //원래는 여기서 SQL 코드
        }

    },
    Mutation: {
        postTweet(__, {text, userId}) {
            const newTweet = {
                id:tweets.length + 1,
                text,
            }
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
            const tweet = tweets.find((tweet) => tweet.id === id)
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id)
            return true;
        },
    },
    User: {
        fullName({firstName,lastName}) {
            return firstName+' '+lastName;
        }
    },
    Tweet: {
        author({userId}){
            return users.find((user) => user.id === userId)
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})

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
//Mutation은 post
//GET /api/v1/tweets
//POST /api/v1/tweets
//GET /api/v1/tweet/:id