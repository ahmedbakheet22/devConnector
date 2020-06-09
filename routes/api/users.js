const express=require('express')
const router =express.Router()
const { check, validationResult } = require('express-validator');
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')  
const User = require('../../models/User')

// @route  Post api/users
// @desc   Register user
// @access puplic

router.post('/',[
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','Include a valid email').isEmail(),
    check('password','Enter password with 6 or more characters')
    .isLength({min:6})
],
    async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }    

    //destructure
    const {name,email,password}=req.body;
    try {
    // see if user exists
    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({errors:[{msg:'User already exists'}]})
    }

    // get user gravatar
    const avatar=gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })

    // create instance of user with out saving

    user= new User({
        name,
        password,
        avatar,
        email
    })

    // encrypt the password using bCrypt

    const salt=await bcrypt.genSalt(10);
    
    user.password=await bcrypt.hash(password,salt)

    // save user

    await user.save()


    // return jsonWebToken

    res.send('User Registered')

    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Server Error')        
    }
  
})


module.exports=router