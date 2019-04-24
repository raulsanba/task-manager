const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    age:{
        type: Number,
        default:0,
        validate(value) {
            if (value< 0 ){
                throw new Error('La edad tiene que ser un numero positivo')
            }
        }
    },
    email: {
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email no valido cazurro')
            }
        }
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("no puedes poner la palabra password")
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required:true
        }
        
    }]
})

UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewlife')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

UserSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}


//hash plain text password
UserSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', UserSchema )

module.exports=User