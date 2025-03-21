import multer from 'multer';

// Multer memory storage engine to store files temporarily
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).array('photos', 6);
