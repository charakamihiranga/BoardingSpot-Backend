import mongoose, {Schema} from "mongoose";
import {IBoarding} from "../types/SchemaTypes";
import {RoomCategory} from "./enums/RoomCategory";
import {Gender} from "./enums/Gender";
import {Occupations} from "./enums/Occupations";

const BoardingSchema = new Schema<IBoarding>(
    {
        title: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        location: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        description: { type: String, required: true, trim: true },
        genderPreference: { type: String, enum: Object.values(Gender), required: true },
        capacity: { type: Number, required: true, min: 1 },
        category: { type: String, enum: Object.values(RoomCategory), required: true },
        rent: { type: Number, required: true, min: 0 },
        mobileNo: { type: Number, required: true, trim: true },
        forWhom: { type: String, enum: Object.values(Occupations), required: true },
        foodAvailability: { type: Boolean, default: false },
        photos: { type: [String], default: [] },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBoarding>('Boarding', BoardingSchema);