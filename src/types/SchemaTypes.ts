import {Document} from "mongoose";
import {Occupations} from "../models/enums/Occupations";
import {Gender} from "../models/enums/Gender";
import {RoomCategory} from "../models/enums/RoomCategory";

export interface IUser extends Document {
    fullName: string;
    email: string;
    dob: Date;
    occupation: Occupations;
    gender: Gender;
    profilePicture: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IBoarding extends Document {
    title: string;
    city: string;
    location: {
        latitude: number;
        longitude: number;
    };
    description: string;
    genderPreference: Gender;
    capacity: number;
    category: RoomCategory;
    rent: number;
    mobileNo: number;
    forWhom: Occupations;
    foodAvailability: boolean;
    photos: string[];
    owner: IUser['_id'];
}