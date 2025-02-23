import express from "express";
import {imageUploader} from "../utils/cloudinaryUtil";
import {FoodSupplier} from "../models/FoodSupplier";

export const addFoodSupplier = async (req: express.Request, res: express.Response) => {
    try {
      const { fullName, location, mobileNo, description, foodType} = req.body;
      const price = req.body.price ? Number(req.body.price) : null;
      const userId = req.body.userId;
      const imageUrls = await imageUploader(req.files as Express.Multer.File[]);
      // create food supplier
      const foodSupplier = await FoodSupplier.create({
          fullName,
          location: typeof location === "string" ? JSON.parse(location) : location,
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