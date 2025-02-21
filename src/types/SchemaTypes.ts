import {Document} from "mongoose";
import {Occupations} from "../models/Occupations";

export interface IUser extends Document {
    fullName: string;
    email: string;
    dob: Date;
    occupation: Occupations;
    profilePicture: string;
    password: string;
}