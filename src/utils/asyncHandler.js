const asyncHandler = (func) => async(req,res,next) =>{
    try {
        await func(req,res,next)
    } catch (error) {
         console.error("Caught error in asyncHandler:", error);
         const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
        res.status(statusCode).json({
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