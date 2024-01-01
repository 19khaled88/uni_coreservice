
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from "../config";

// export const createAccessToken=async(data:ITokenData):Promise<IAccessTokenResponse>=>{
//    const res = jwt.sign({ data: data }, config.jwt.access_token as Secret, { expiresIn: config.jwt.access_token_expires_id });
//    return {
//     accessToken:res
//    }
// }

export const createAccessToken=async(data:any)=>{
   const  res = jwt.sign({ id:data.id,role:data.role }, config.jwt.access_token as Secret, { expiresIn: config.jwt.access_token_expires_id });
   return res
}

export const createRefreshToken=async(data:any)=>{
   return jwt.sign({ id:data.id,role:data.role }, config.jwt.refresh_token as Secret, { expiresIn: config.jwt.refresh_token_expires_id });
}

export const tokenVerify =async(token:string,secret:any)=>{
   
  return jwt.verify(token,secret)
//   const decoded =  jwt.verify(token,config.jwt.access_token as Secret) as JwtPayload 
}