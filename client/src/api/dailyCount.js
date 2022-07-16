import axios from "axios";

export const getDailyCount = async () => {
    const response = await axios.get("/api/dailyCount");
    return response;
}