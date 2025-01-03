const sendToken = (user,statusCode,res) =>{

    const token = user.getJWTToken();

    const options = {
        expiresIn:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 *1000
        ),
        httponly:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })

}

export default sendToken