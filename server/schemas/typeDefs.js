
const {gql} = require("apollo-server-express")

const typeDefs = gql`

    type Message{
        _id:ID
        textValue:String
        sender: User
        createdAt:String
    }

    type Channel{
        _id:ID
        users:[User]
        messages:[Message]
        createdAt:String
    }

    type User{
        _id: ID
        username:String
        email:String
        channelModel:[Channel]
        friends:[User]
        createdAt: String
    }
    input Userss{
        _id:ID
    }
    input Messagess{
        _id:ID
    }
    type Auth{
        token: ID!
        user: User
    }
    type Query {
        users(username:String): [User]
        channels:[Channel]
        messages: [Message]
        deleteChannels: Channel
        deleteMessages: Message
        me: User 
        channel(_id: ID!):Channel
        
    } 

    type Mutation{
        addUser(username:String!, email:String!, password:String!): Auth
        login(email:String!,password:String!):Auth
        createChannel(users:[Userss]!): Channel
        sendMessage(_id:ID,textValue:String!,senderId:Userss!):Channel
        createMessage(textValue:String!): Message
        findUser(email:String!):User
    }
`
module.exports = typeDefs