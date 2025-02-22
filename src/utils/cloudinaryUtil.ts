import cloudinary from "../config/cloudinary";

export async function imageUploader(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(`data:image/jpeg;base64,${file.buffer.toString('base64')}`)
    );

    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults.map((result) => result.secure_url);
}

export async function deleteImages(imageUrls: string[]) {
    if (!imageUrls || imageUrls.length == 0 ) return;
    try {
        for (const imageUrl of imageUrls) {
            const publicId = extractPublicId(imageUrl);
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function extractPublicId(imageUrl: string) {
    if (!imageUrl) return null;
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1];
    return filename.split(".")[0] || null;
}
