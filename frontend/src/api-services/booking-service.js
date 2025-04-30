import axios from "axios";

export const createBooking = async (bookingData) => {
  const response = await axios.post(
    "/api/bookings/create-booking",
    bookingData
  );
  return response.data;
};

export const getUserBookings = async () => {
  const response = await axios.get("/api/bookings/get-user-bookings");
  return response.data;
};


export const getAllBookings = async () => {
    const response = await axios.get("/api/bookings/get-all-bookings");
    return response.data;
  };
  