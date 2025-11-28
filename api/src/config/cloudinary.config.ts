import { v2 as cloudinary } from "cloudinary";
import { Env } from "./env.config";

cloudinary.config({
 cloud_name: Env.CLOUDINARY_NAME,
 api_key: Env.CLOUDINARY_API_KEY,
 api_secret: Env.CLOUDINARY_SEC,
});

export default cloudinary;
