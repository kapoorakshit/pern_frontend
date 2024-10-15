import axios from "axios";
import authHeader from "./AuthHeader"; // Ensure your AuthHeader handles token or authentication logic

const API_URL = "http://localhost:3000/"; // Use the correct port for your backend

export const getAllTasks = () => {
    return axios.get(`${API_URL}tasks`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching tasks:", error);
            throw error;
        });
};

export const updateTask = async (id: number | undefined, title: string, description: string, dueDate: string) => {
    const taskData = {
        title: title,
        description: description,
        dueDate: dueDate,
    };

    try {
        const response = await axios.put(`${API_URL}tasks/${id}`, taskData, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (id: number | undefined) => {
    try {
        const response = await axios.delete(`${API_URL}tasks/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

// Add a new task
export const addTask = async (title: string, description: string, dueDate: string, createdAt: string) => {
    const taskData = {
        title: title,
        description: description,
        dueDate: dueDate,
        createdAt: createdAt,
    };

    try {
        const response = await axios.post(`${API_URL}tasks`, taskData, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

// Fetch a task by ID
export const getTaskById = async (id: number | undefined) => {
    try {
        const response = await axios.get(`${API_URL}tasks/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
};


// Sign up a new user
export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
    };

    try {
        const response = await axios.post(`${API_URL}signup`, userData);
        return response.data; // Return success message or user info if needed
    } catch (error) {
        console.error("Error during signup:", error);
        throw error; // Rethrow the error for further handling in the component
    }
};

// Log in a user
export const login = async (email: string, password: string) => {
    const credentials = {
        email: email,
        password: password,
    };

    try {
        const response = await axios.post(`${API_URL}login`, credentials);
        return response.data; // Return token or user info if needed
    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Rethrow the error for further handling in the component
    }
};

