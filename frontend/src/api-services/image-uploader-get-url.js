import axios from "axios";

async function uploadImageToCloudinary(file) {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'event-management-app-preset'); // Found in Cloudinary settings

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dvxwpuleg/image/upload`,
            formData
        );

        return response.data.secure_url; // Returns the public image URL
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Failed to upload image.");
    }
}

export default uploadImageToCloudinary;
