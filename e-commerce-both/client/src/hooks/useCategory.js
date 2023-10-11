import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  // const host="http://localhost:8080";
  const host=process.env.REACT_APP_BACKEND_URL;
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${host}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
