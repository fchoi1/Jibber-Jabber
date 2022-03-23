const { AuthenticationError } = require("apollo-server-express");
const {User, Message, Channel} = require("../models")


const resolvers = {
    Query: {
        users:async(p,{username})=>{
            const params = username ? {username} : {}
            return User.find(params);
        },
        channels: async(p,args)=>{
            return Channel.find({}).populate("users messages")
        },
        messages: async(p,args)=>{
            return Message.find({})
        },
        deleteChannels: async(p,args)=>{
            return Channel.deleteMany({})
        },
        deleteMessages:async(p,args)=>{
            return Message.deleteMany({})
        }
    },
    Mutation:{
        addUser: async(parent,args)=>{
            const user = await User.create(args)
            //jwt token stuff goes here
            return user;
        },
        login: async(parent,{email, password} )=>{
            const user = await User.findOne({ email })
            if(!user){
              return new AuthenticationError("Incorrect Credentials!!")
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
              return new AuthenticationError("Invalid Credentials")
            }
            //JWT stuff goes here
            return user;
          },
          createChannel: async(parent,{users})=>{
              return Channel.create({users:users})
          },
          sendMessage: async(parent,{_id,textValue,senderId})=>{
              //we will first create a message get id and then grab the value from the message table
            const msgId = await Message.create({textValue:textValue,sender:senderId})
            //we can use the textvalue to update the channel
            return Channel.findOneAndUpdate({_id},{$push:{messages:msgId}})
               
              //return Channel.updateOne({_id},{$push:{messages:{}}})
          },
          createMessage: async(p,args)=>{
              return Message.create(args)
          }
    }
}
module.exports = resolvers
