import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import { LoginSchemaType, RegisterSchemaType } from "../validators/auth.validator";


export const registerService = async (body: RegisterSchemaType) => {
    
    const existingUser = await UserModel.findOne({email: body.email})
    if(existingUser) throw new UnauthorizedException("User already exists")
    const newUser = new UserModel({
        email: body.email,
        password: body.password,
        name: body.name,
        avatar: body.avatar
    })
    await newUser.save()
    return newUser
}

export const loginService = async (body: LoginSchemaType) => {
    const {email, password} = body
    const user = await UserModel.findOne({email})
    if(!user) throw new NotFoundException("Email or Password is incorrect")

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid)
    throw new UnauthorizedException("Invaild email or password");

  return user;


}