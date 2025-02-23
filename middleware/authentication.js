import jwt from "jsonwebtoken"

export const isAuthentication = async(req, res ,next)=>{
    try {
        const token = req.cookies?.token;
        // console.log(token)  //working fine
        if(!token){
            return res.status(401).json({
                message:"Invalid token try again",
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY )
        // console.log(decode) working fine
        if(!decode || !decode.userId){
            return res.status(401).json({
                message:"unauthorized request",
                success:false
            })
        }
        req.id = decode.userId;
        // console.log(req.id) working fine
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
