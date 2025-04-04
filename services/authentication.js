import JWT from "jsonwebtoken"

const key = "$uper$tar";
export function createTokenforUsers(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImgUrl: user.profileImg,
        role: user.role,
    };

    const token = JWT.sign(payload, key);
    return token;
}

export function validateToken(token){
    const payload = JWT.verify(token, key);
    return payload;
}
