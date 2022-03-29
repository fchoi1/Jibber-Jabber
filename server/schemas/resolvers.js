const { AuthenticationError } = require("apollo-server-express");
const {User, Message, Channel} = require("../models")
const {signToken,authMiddleware} = require("../utils/auth")

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user)
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
              .populate({
                
                path:"channelModel",
                populate:{
                    path: "messages",
                    populate:{
                        path:"sender"
                    }
                    
                }
            }).populate({
                path:"channelModel",
                populate:{
                    path: "users"
                }
            });
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
        users:async(p,{username})=>{
            const params = username ? {username} : {}
            return await User.find(params).populate({
                
                path:"channelModel",
                populate:{
                    path: "messages",
                    populate:{
                        path:"sender"
                    }
                }
            });

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
        },
        channel:async(p,{_id})=>{
            return Channel.findById({_id}).populate("users").populate({
                
                path:"messages",
                populate:{
                    path: "sender"
                }
            })
        },
       
        
        
    },
    Mutation:{
        addUser: async(parent,args)=>{
            const user = await User.create(args)
            //jwt token stuff goes here
            const token = signToken(user);
            return {token,user};
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
            const token = signToken(user)
            return {token, user};
            return user;
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
          },
          findUser: async(p,{email})=>{
            //console.log(args.char)
            //const pattern = `/^${username}/`
            return User.findOne({email});
        }
    }
}
module.exports = resolvers
