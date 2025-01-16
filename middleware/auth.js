import jwt from 'jsonwebtoken'
const secret = 'uzefa';

export const auth =async(req ,res ,next)=>{
    try {
        const token =req.header.authorization.split('')[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token,secret);
            req.userId = decodedData?.id
        }
        next();
    } catch (error) {
        res.status(403).json({message:"403 Request Forbidden"})
   console.log(error)
    }}
