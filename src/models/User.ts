import mongoose, {Document,Schema} from "mongoose";
import bcrypt from "bcryptjs";
import {IUser} from "../types/SchemaTypes";

const UserSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    profilePicture: { type: String, required: false },
    password: { type: String },
});

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema)