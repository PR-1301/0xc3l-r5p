//verifies the JWT signature

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try{
        const authHeaders = req.headers.authorization;


        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Access Denied"
            })
        }

        const token = authHeaders.split(" ")[1];

        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )

        req.user = decoded;

        next()

    } catch(error){
        res.status(401).json({
            message: "Invalid or expired Token"
        });
    }
}

export default authMiddleware;