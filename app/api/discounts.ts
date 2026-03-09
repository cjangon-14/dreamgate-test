import axios from "axios";
// // Basic GET request
// const response = await axios.get("https://api.example.com/data");
// console.log(response.data);

// // GET request with query parameters
// const response = await axios.get("https://api.example.com/data", {
//   params: {
//     id: 1,
//     name: "example",
//   },
// });

// // GET request with headers
// const response = await axios.get("https://api.example.com/data", {
//   headers: {
//     Authorization: "Bearer token",
//   },
// });

// // Using environment variables (for your project)
// const discountsUrl = import.meta.env.VITE_API_DISCOUNTS_URL;
// const response = await axios.get(discountsUrl);

export const getDiscounts = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_DISCOUNTS_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
  
};
