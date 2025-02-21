import mongoose, {Document,Schema} from "mongoose";
import bcrypt from "bcryptjs";
import {IUser} from "../types/SchemaTypes";



const UserSchema = new Schema<IUser>({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    dob: {type: Date, required: true},
    occupation: {type: String, required: true},
    profilePicture: {type: String, required: true},
    password: {type: String, required: true},
})

// password hashing before saving the user
UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model<IUser>('User', UserSchema);