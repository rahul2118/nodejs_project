import User from "../model/user";
import bcrypt from 'bcryptjs'

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    
    if (users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
     return console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({message: "User Already Exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[],
    });
    try {
        await user.save();
    } catch (err) {
     return console.log(err);
    }
    return res.status(201).json({user})
}

export const login = async(req, res, next)=>{
  const {email, password} = req.body
  let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (err) {
     return console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({message: "Couldnt find user by this email"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect){
      return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login Successful"})
}