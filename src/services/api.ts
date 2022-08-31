import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

function sleep(ms = 2000): Promise<void> {
  console.log("Kindly remember to remove `sleep`");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

api.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === "development") {
    await sleep();
  }
  return response;
});
