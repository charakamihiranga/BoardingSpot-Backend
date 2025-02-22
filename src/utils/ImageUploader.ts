import cloudinary from "../config/cloudinary";

export default async function imageUploader(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(`data:image/jpeg;base64,${file.buffer.toString('base64')}`)
    );

    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults.map((result) => result.secure_url);
};