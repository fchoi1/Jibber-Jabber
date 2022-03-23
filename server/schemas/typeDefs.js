
const {gql} = require("apollo-server-express")

const typeDefs = gql`

    type Message{
        _id:ID
        textValue:String
        sender: User
    }

    type Channel{
        _id:ID
        users:[User]
        messages:[Message]
    }

    type User{
        _id: ID
        username:String
        email:String
        channel:[Channel]
        friends:[User]
    }
    input Userss{
        _id:ID
    }
    input Messagess{
        _id:ID
    }
    type Query {
        users(username:String): [User]
        channels:[Channel]
        messages: [Message]
        deleteChannels: Channel
        deleteMessages: Message
    } 

    type Mutation{
        addUser(username:String!, email:String!, password:String!): User
        login(email:String!,password:String!):User
        createChannel(users:[Userss]!): Channel
        sendMessage(_id:ID,textValue:String!,senderId:Userss!):Channel
        createMessage(textValue:String!): Message
    }
`
module.exports = typeDefs
