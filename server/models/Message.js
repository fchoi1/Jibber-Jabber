//this schema will contain all the messages
const {Schema, model} = require("mongoose")

const messageSchema = new Schema({

    textValue:{
        type:String,
        trim: true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

})

const message = model("message",messageSchema)

module.exports = message