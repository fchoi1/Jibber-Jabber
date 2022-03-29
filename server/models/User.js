const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match:[/.+@.+\..+/, 'Must use a valid email address']
        },
        password:{
            type:String,
            required:true
        },
        channelModel:[
            {
                type:Schema.Types.ObjectId,
                ref:"channel"
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now,
            //formatting the date to be done
        },
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:"user"
            }
        ]
    },
    {
        toJSON: {
        virtuals: true,
        },
    }
)

// get total count of friends of the user
userSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

//hash the password when new user signsup or current user modiefies password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
  

const User = model("user",userSchema)

module.exports = User
