import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async (req , res) => {
    const {fullname,email,username,password} = req.body
    if ([fullname,email,username,password].some((field) =>
    field?.trim() === "")) {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    
    if (existedUser) {
        throw new ApiError(409, "user with this email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.create(user._id).select(
        "-password -refrestToken"
    )

    if(!createdUser) {
        throw new ApiError(500,"Something went wrong while regestring the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registerd successfully")
    )


} )

export { registerUser };
