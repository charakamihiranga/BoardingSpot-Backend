import { Schema, model } from "mongoose";
import { IFoodSupplier } from "../types/SchemaTypes";
import {FoodType} from "./enums/FoodType";

const FoodSupplierSchema = new Schema<IFoodSupplier>({
    fullName: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    city: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    description: { type: String, required: true },
    foodType: { type: [String], enum: Object.values(FoodType), required: true},
    price: { type: Number, required: true },
    photos: { type: [String], default: [] },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});

export const FoodSupplier = model<IFoodSupplier>("FoodSupplier", FoodSupplierSchema);
