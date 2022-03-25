const { AuthenticationError } = require("apollo-server-express");
const {User, Message, Channel} = require("../models")


const resolvers = {
    Query: {
        users:async(p,{username})=>{
            const params = username ? {username} : {}
            return await User.find(params).populate("channelModel");
        },
        channels: async(p,args)=>{
            return Channel.find({}).populate("users").populate({
                
                path:"messages",
                populate:{
                    path: "sender"
                }
            })
        },
        messages: async(p,args)=>{
            return Message.find({}).populate("sender")
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
            return User.findOne({email:user.email}).populate({
                
                path:"channelModel",
                populate:{
                    path: "messages",
                    populate:{
                        path:"sender"
                    }
                }
            })
            // .populate({
                
            //     path:"messages",
            //     populate:{
            //         path: "sender"
            //     }
            // })
          },
          createChannel: async(parent,{users})=>{
              const channelData =  await Channel.create({users:users})
              console.log(channelData)

              const updatePromises = users.map(u => (
              User.findOneAndUpdate({_id:u._id},{
                    $push:{channelModel : channelData}  
                },{new:true})
            )) 
            Promise.all(updatePromises).then(console.log).catch(console.error)
          },
          sendMessage: async(parent,{_id,textValue,senderId})=>{
              //we will first create a message get id and then grab the value from the message table
            const msgId = await Message.create({textValue:textValue,sender:senderId})
            console.log(msgId)
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