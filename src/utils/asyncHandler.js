const asyncHandler = (func) => async(req,res,next) =>{
    try {
        await func(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success :false,
            message :error.message
        })
    }
}

export { asyncHandler };

//this is the same code but using promise

// const asyncHandler = (requsetHander) => {
//     return (req,res,next) => {
//         Promise.resolve(requestHander(req,res,next)).catch((err) => next(err))
//     }
// }

// export{ asyncHandler }