const express=require('express')
const router =express.Router()
const auth = require('../../middleware/auth')
const Profile=require('../../models/Profile')
const User=require('../../models/User')
const { check, validationResult } = require('express-validator');
const request =require('request')
const config =require('config')



// @route GET api/profile/me
// @desc get current user profile route
// @access private

router.get('/me',auth, async (req,res)=>{
    try {
        const profile=await Profile.findOne({
            user:req.user.id
        })
        .populate('user',['name','avatar'])

        if(!profile){
            return res.status(400).json({msg:'there is no profile for this user'})
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

// @route POST api/profile
// @desc create or update user profile
// @access private

router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]],
async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    //build profile obj
    const profileFields={}
    profileFields.user=req.user.id
    if(company) profileFields.company=company
    if(website) profileFields.website=website
    if(location) profileFields.location=location
    if(bio) profileFields.bio=bio
    if(status) profileFields.status=status
    if(githubusername) profileFields.githubusername=githubusername
    if(skills) {
        profileFields.skills=skills.split(',').map(skill=>skill.trim())
    }
    profileFields.social={}
    if(youtube) profileFields.social.youtube=youtube
    if(facebook) profileFields.social.facebook=facebook
    if(twitter) profileFields.social.twitter=twitter
    if(instagram) profileFields.social.instagram=instagram
    if(linkedin) profileFields.social.linkedin=linkedin

    // lets insert data

    try {

        let profile=await Profile.findOne({
            user:req.user.id
        })
        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
            return res.json(profile)
        }

        // insert new profile

        profile= new Profile(profileFields)
        await profile.save();
        return res.json(profile)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
       }

})

// @route GET api/profile
// @desc Get all profiles
// @access puplic

router.get('/',async (req,res)=>{
    try {
        const profiles=await Profile.find().populate('user',['name','avatar'])
        res.json(profiles)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

})

// @route GET api/profile/user/:user_id
// @desc Get  profile bu user id
// @access puplic

router.get('/user/:user_id',async (req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile) return res.status(400).json({msg:'profile not found'})
        res.json(profile)
        
    } catch (error) {
        console.error(error.message)
        if(error.kind=='ObjectId'){
         return res.status(400).json({msg:'profile not found'})
        }
        res.status(500).send('Server Error')
    }

})


// @route DELETE api/profile
// @desc Delete profile , user, Posts
// @access private

router.delete('/',auth,async (req,res)=>{
    try {
        //remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        await User.findOneAndRemove({_id:req.user.id})
        res.json({msg:'User deleted '})
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }

})


// @route PUT api/profile/experience
// @desc add profile experience 
// @access private

router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','company is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }



    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body

    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id})
        //push last experience in the to of array using unshift

        if(!profile) return res.status(400).json({msg:'user has no profile'})
        profile.experience.unshift(newExp)

        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})


// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access private

router.delete('/experience/:exp_id',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        // get experience id to delete

        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        await profile.save()
        return res.json(profile )
    } catch (error) {
        console.error(errors)
        res.status(500).send('server error')
    }
})



// @route PUT api/profile/education
// @desc add profile education 
// @access private

router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),
    check('fieldofstudy','field of study is required').not().isEmpty()

]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }



    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=req.body

    const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id})
        //push last experience in the to of array using unshift

        if(!profile) return res.status(400).json({msg:'user has no profile'})
        profile.education.unshift(newEdu)

        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})


// @route DELETE api/profile/education/:exp_id
// @desc delete experience from profile
// @access private

router.delete('/education/:edu_id',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})
        // get experience id to delete

        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex,1)
        await profile.save()
        return res.json(profile )
    } catch (error) {
        console.error(errors)
        res.status(500).send('server error')
    }
})

// @route GET api/profile/github/:username
// @desc get user repos from github
// @access puplic

router.get('/github/:username',(req,res)=>{
    try {
        const options ={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        }
        request(options,(error,response,body)=>{
            if(error)console.log(error)
            if(response.statusCode!==200) return res.status(404).json({msg:'no git hub profile found'})
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.error(error)
        res.send(500).send('server error')
    }
})


module.exports=router