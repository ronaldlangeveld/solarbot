import axios from "axios";

export const getCurrentStatus = async () => {
    const response = await axios.get("/api/currentStatus");
    return response;
}