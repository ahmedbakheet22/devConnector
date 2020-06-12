const express=require('express')
const router =express.Router()
const auth = require('../../middleware/auth')
const User =require('../../models/User')
const jwt=require('jsonwebtoken')
const config=require('config')
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')  




// @route GET api/auth
// @desc GET user by token route
// @access puplic

router.get('/' , auth , async (req,res)=>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            res.json(user)
        } catch (error) {
            res.status(500).send('server error')
        }
})


// @route  POST api/auth
// @desc   Auth user and get token
// @access puplic

router.post('/',[
    
    check('email','Include a valid email').isEmail(),
    check('password','password is required').exists()
],
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }    

    const {email,password}=req.body;
    try {
    // see if user not exists
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:[{msg:'invalid credentials'}]})
    }

    
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({errors:[{msg:'invalid credentials'}]})

    }
    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(payload,config.get('jwtSecret'),{
        expiresIn:360000
    },(err,token)=>{
        if(err)  throw err
        res.json({token})
        
    })


    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Server Error')        
    }
  
})


module.exports=router