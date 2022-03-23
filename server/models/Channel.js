//this schema can be defnied as a room/container where 2 or more users exhange texts
//every channel will have a users array which will share their respective texts
//also it will contain the messages array containing the texts that were exchanged...
const {Schema, model}  = require("mongoose")
const channelSchema = new Schema({

    users:[
        {
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"message"
        }
    ]

},
{
    toJSON:{
        virtuals:true
    },
    id: false
})

const channel = model("channel",channelSchema)
module.exports = channel