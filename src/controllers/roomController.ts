import express from "express";
import {deleteImages, imageUploader} from "../utils/cloudinaryUtil";
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

export const deleteBoarding = async (req: any, res: any ) => {
    try {
     const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid boarding ID" });
        }
        const boarding = await Boarding.findByIdAndDelete(id);
        if (!boarding) {
            res.status(404).json({message: 'Boarding not found'});
        } else {
            await deleteImages(boarding.photos);
            res.status(200).json({message: 'Boarding deleted successfully'});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const updateBoarding = async (req: any, res: any) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid boarding ID"});
        }
        const existingBoarding = await Boarding.findById(id);
        if (!existingBoarding) {
            return res.status(404).json({message: "Boarding not found"});
        }
        // Update location if only one of the latitude or longitude is provided
        updates.location = {
            latitude: updates.location?.latitude ?? existingBoarding.location.latitude,
            longitude: updates.location?.longitude ?? existingBoarding.location.longitude,
        };

        // Delete existing images if new images are uploaded
        if (req.files && req.files.length > 0) {
            if (existingBoarding.photos && existingBoarding.photos.length > 0) {
                await deleteImages(existingBoarding.photos);
            }
            // Upload new images
            updates.photos = await imageUploader(req.files as Express.Multer.File[]);
        }
        const updatedBoarding = await Boarding.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
        res.status(200).json({message: 'Boarding updated successfully', boarding: updatedBoarding});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getBoardingsByOwner = async (req: any, res: any) => {
    try {
        const {ownerId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return res.status(400).json({ message: "Invalid owner ID" });
        }
        const boardings = await Boarding.find({owner: ownerId});
        res.status(200).json(boardings);
    } catch (e) {
        res.status(500).json({message: 'Internal server error'});
    }
}

export const filterBoardings = async (req: any, res: any) => {
    try {
        const {city, genderPreference, capacity, maxPrice, foodAvailability, forWhom, category} = req.query;
        const filterQuery: any = {};
        if (city) filterQuery.city = city;
        if (genderPreference) filterQuery.genderPreference = genderPreference;
        if (capacity) filterQuery.capacity = {$gte: Number(capacity)};
        if (maxPrice) filterQuery.rent = {$lte: Number(maxPrice)};
        if (foodAvailability) filterQuery.foodAvailability = foodAvailability === 'true';
        if (forWhom) filterQuery.forWhom = forWhom;
        if (category) filterQuery.category = category;

        const filteredBoardings = await Boarding.find(filterQuery);
        res.status(200).json(filteredBoardings);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

