const User=require('../model/userModel');
const generateToken=require('../utils/genearatetoken');

const registerUser=async(req,res)=>{
    const {name,email,password,pic}=req.body;
    try{
        let userExists =await User.findOne({email});
        if (userExists) {
            res.status(400).json({message:"Email already exists"});
        }else{
            const newuser = await User.create({ name, email, password, pic });
            res.status(200).json({
                _id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                pic:newuser.pic
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Server Error"});

    }
}

const authUser =async(req,res)=>{
    const {email,password} =req.body;
    const user= await User.findOne({email});

    if(user && await user.matchPassword(password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

}
const updateUserProfile=async(req,res)=>{
    const user= await user.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name ;
        user.email = req.body.email || user.email;
        user.pic= req.body.pic || user.pic;
        if(req.body.password){
            user.password = req.body.password 
    }
    const updatedUser= await user.save();

    req.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        pic:updatedUser.pic,
        token:generateToken(updatedUser._id)
    })
}
else{
    res.status(404);
    throw new Error("User not found")
}
}
module.exports ={
    registerUser,authUser,updateUserProfile
}