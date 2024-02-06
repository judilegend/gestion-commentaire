const jwt = require('jsonwebtoken')
const user = require('../models/user')

const requireAuth = async (req, res, next) => {
    //verify that the user is authenticated
    const {authorization} = req.headers

    console.log(authorization);
    if(!authorization){
        res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]


    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await user.findOne({ _id }).select('_id')
        // res.status(200).json(user)
 
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}
module.exports = requireAuth