import express from "express";
import {deleteImages, imageUploader} from "../utils/cloudinaryUtil";
import {FoodSupplier} from "../models/FoodSupplier";
import mongoose from "mongoose";

export const addFoodSupplier = async (req: express.Request, res: express.Response) => {
    try {
      const { fullName, location, city, mobileNo, description, foodType} = req.body;
      const price = req.body.price ? Number(req.body.price) : null;
      const userId = req.body.userId;
      const imageUrls = await imageUploader(req.files as Express.Multer.File[]);
      // create food supplier
      const foodSupplier = await FoodSupplier.create({
          fullName,
          location: typeof location === "string" ? JSON.parse(location) : location,
          city,
          mobileNo,
          description,
          foodType,
          price,
          photos: imageUrls,
          userId,
      });
      if (foodSupplier) {
            res.status(201).json(foodSupplier);
      } else {
            res.status(400).json({message: 'Invalid food supplier data'});
      }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const getFoodSuppliers = async (req: any, res: any) => {
    try {
        const { city, foodType, maxPrice, page = 1, limit = 10 } = req.query;

        const query: any = {};
        if (city) query.city = city;
        if (foodType) query.foodType = foodType;
        if (maxPrice) query.price = { $lte: Number(maxPrice) };

        const total = await FoodSupplier.countDocuments(query);

        const foodSuppliers = await FoodSupplier.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json({
            data: foodSuppliers,
            page: Number(page),
            count: total,
            totalPages: Math.ceil(total / Number(limit)),
            hasMore: Number(page) * Number(limit) < total,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getFoodSupplierById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid food supplier ID" });
        }
        const foodSupplier = await FoodSupplier.findById(id);
        if (!foodSupplier) {
            res.status(404).json({message: 'Food supplier not found'});
        } else {
            res.status(200).json(foodSupplier);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const updateFoodSupplier = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid food supplier ID" });
        }
        const existingSupplier = await FoodSupplier.findById(id);
        if (!existingSupplier) {
           return res.status(404).json({message: 'Food supplier not found'});
        }
        // Update location if only one of the latitude or longitude is provided
        updates.location = {
            latitude: updates.location?.latitude ?? existingSupplier.location.latitude,
            longitude: updates.location?.longitude ?? existingSupplier.location.longitude,
        };

        // if new photos are uploaded, update the photos
        if (req.files && req.files.length > 0) {
           if (existingSupplier.photos.length > 0 ) {
                await deleteImages(existingSupplier.photos);
           }
           updates.photos = await imageUploader(req.files as Express.Multer.File[]);
        }
        const updatedSupplier =
            await FoodSupplier.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
        res.status(200).json(updatedSupplier);
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteFoodSupplier = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid food supplier ID" });
        }
        const foodSupplier = await FoodSupplier.findByIdAndDelete(id);
        if (!foodSupplier) {
            res.status(404).json({message: 'Food supplier not found'});
        } else {
            await deleteImages(foodSupplier.photos);
            res.status(200).json({message: 'Food supplier deleted successfully'});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    }
}

