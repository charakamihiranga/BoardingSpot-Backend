import express from "express";
import imageUploader from "../utils/ImageUploader";
import Boarding from "../models/Boarding";
import mongoose from "mongoose";

export const addBoarding = async (req: express.Request, res: express.Response) => {
    try {
        const {title, city, location, description, genderPreference,
            capacity, category, mobileNo, forWhom, foodAvailability} = req.body;
        const rent = req.body.rent ? Number(req.body.rent) : null;
        const userId = req.body.owner;
        const imageUrls = await imageUploader(req.files as Express.Multer.File[]);
        const room = await Boarding.create({
            title,
            city,
            location: typeof location === "string" ? JSON.parse(location) : location,
            description,
            genderPreference,
            capacity,
            category,
            rent,
            mobileNo,
            forWhom,
            foodAvailability,
            photos: imageUrls,
            owner: userId,
        });
        if (room) {
            res.status(201).json(room);
        } else {
            res.status(400).json({message: 'Invalid room data'});
        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
      console.error(e);
    }
}

export const getAllBoarding =async (req: express.Request, res: express.Response) => {
    try {
        const boardings = await Boarding.find();
        res.status(200).json(boardings);
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
        console.error(e);
    }
}

export const getBoardingById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid boarding ID" });
        }
        const boarding = await Boarding.findById(id);
        if (!boarding) {
            res.status(404).json({message: 'Boarding not found'});
        } else {
            res.status(200).json(boarding);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}