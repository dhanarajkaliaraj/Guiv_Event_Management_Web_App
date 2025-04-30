import axios from 'axios';

export const createEvent = async (event) => {
    const response = await axios.post('/api/events/create-event', event);
    return response.data;
};

export const getEvents = async (filters) => {
    const response = await axios.get(`/api/events/get-events?searchText=${filters.searchText}&date=${filters.date}`);
    return response.data;
};

export const getEventById = async (id) => {
    const response = await axios.get(`/api/events/get-event/${id}`);
    return response.data;
};

export const updateEvent = async (id, event) => {
    const response = await axios.put(`/api/events/edit-event/${id}`, event);
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await axios.delete(`/api/events/delete-event/${id}`);
    return response.data;
}