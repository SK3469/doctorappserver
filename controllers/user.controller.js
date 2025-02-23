import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email, !password) {
            return res.status(400).json({
                message: "All field required!!!",
                success: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "user already registerd with this email try another.",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created sucessfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email, !password) {
            return res.status(400).json({
                message: "All field is required!!!",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "user didn't exists with this email",
                success: false
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Invalid email or password!",
                success: false
            })
        }
        generateToken(res, user, ` Welcome back ${user.name}`)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            })
        }
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id; // we can destructure because of single object came ... dont use {}
        console.log(userId)
        const { firstname,
            lastname, phonenumber, addressline1,
            addressline2, city, state, zipcode } = req.body;
        const user = await User.findById(userId);
        const updatedData = {firstname , lastname, phonenumber,
            addressline1,addressline2 ,city, state,zipcode};
            const updatedUser = await User.findByIdAndUpdate(userId, updatedData ,{new:true}).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully.",
            updatedUser
        })
    } catch (error) {
        console.log(error)
    }
}