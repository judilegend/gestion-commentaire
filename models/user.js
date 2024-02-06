const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema({
    email:{
        type: 'string',
        unique: true,
        require:true
    },
    password:{
        type : 'string',
        require:true
    }
},{
    timestamps:true
}
)
//static signup method
userSchema.statics.signup = async function(email, password){

    //validation
    if(!email||!password) throw Error('verifier les champs vides')

    if(!validator.isEmail(email)) throw Error('Email not found');
    if(!validator.isStrongPassword(password)) throw Error('Mot de pass faible');

    const exist = await this.findOne({ email})
    if(exist){
        throw Error(`User ${email} already exists`)
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)


    const user = await this.create({email,password:hash})

    return user
}
userSchema.statics.login = async function(email, password) {
    if(!email||!password) throw Error('verifier les champs vides')
    
    const user = await this.findOne({ email})
    if(!user){
        throw Error(`email non correct`)
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error(`password incorrect`)
    }
    return user
}
module.exports = mongoose.model("user",userSchema)