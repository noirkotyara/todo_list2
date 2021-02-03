const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTION'){
        next()
    }
    try{
        
        const token = req.headers.authorization.split(' ')[1]
        
        if(!token){
            return res.status(401).json({message: 'User is not authenticated'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //user: {userId: '23092i09'}
        
        req.user = decoded
        // console.log(req.user)
        next()

    }catch(e){
        res.status(401).json({message: 'User is not verified'})
    }
}