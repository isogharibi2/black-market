import React, { useEffect, useState } from "react";

import "./Admin.scss";
import {
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { baseUrl, BBUrlKey, ImgBBUrl } from "@app/helpers/variables";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const [imageSrc, setImageSrc] = useState("");
  const [categoryInput, setcategoryInput] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image' , file)

    const response = await axios.post(`${ImgBBUrl}?key=${BBUrlKey}` ,formData, {
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    });
    setImageSrc(response.data.data.url);
  };

  useEffect(() => {
    if (!localStorage.getItem("verified")) {
      navigate("/auth/register");
    }
  });

  const allsize = ['SM' , 'S' , 'M' , 'L' , 'XL' , 'XS'];
  const allcolors = ['Blue' , 'Biege' , 'Red' , 'Pink' , 'Green']

  const mutationFn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const NewCategories = formData.get("category");
    const NewCategoryUnique = !categories.some(
      (cat) => cat.category === NewCategories
    );

    if (NewCategoryUnique) {
      try {
        await axios.post(`${baseUrl}/categories`, {
          category: NewCategories,
        });
      } catch (err) {
        console.error(err);
      }
    }

    const selectedSizes = allsize.filter(size=> formData.get(`size${size}`));
    const selectedColors = allcolors.filter(color => formData.get(`colors-${color}`))

    try {
      const response = await axios.post(`${baseUrl}/specail-offers`, {
        title: formData.get("title"),
        enTitle: formData.get("en-title"),
        brand: formData.get("brand"),
        sizes: selectedSizes,
        colors : selectedColors,
        originalPrice: formData.get("originalPrice"),
        offerPrice: formData.get("offerPrice"),
        percentage: formData.get("percentage"),
        category: formData.get("category"),
        imageSrc ,
        slug: formData.get("en-title"),
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn,

    onError: (error) => {
      console.error("خطا در ایجاد محصول:", error);
      alert("خطا در ایجاد محصول!");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
    },
  });

  const queryFn = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/categories`);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn,
  });

  return (
    <>
      <form className="newProduct" onSubmit={mutate}>
        <section className="rightSide">
          <fieldset>
            <legend> اطلاعات کلی محصول </legend>
            <input
              className="newPrInput"
              name="title"
              type="text"
              placeholder="عنوان محصول شما"
            />
            <input
              className="newPrInput"
              name="en-title"
              type="text"
              placeholder="عنوان انگیلیسی محصول شما"
            />
            <input
              className="newPrInput"
              name="brand"
              type="text"
              placeholder="برند مصحول شما"
            />
            <input
              className="newPrInput"
              name="category"
              type="text"
              placeholder="اضافه کردن دسته بندی"
              value={categoryInput}
              onChange={(e) => setcategoryInput(e.target.value)}
            />

            <div className="select-wrapper">
              <select name="category">
                {categories?.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.category}
                  </option>
                ))}
                {/* {categoryInput !== "" ? <option value={category}>{category}</option>
                : categories?.map((category, index) => (
                  <option key={index} value={category.category}>
                    {" "}
                    {category.category}{" "}
                  </option>
                ))} */}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <legend> رنگ و سایزبندی </legend>
            <div className="sizes">
              <label htmlFor="sizes"> سایز های موجود محصول </label>
              {allsize.map((size) => (
                <label key={size}>
                  {size} <input type="checkbox" name={`size${size}`} />
                </label>
              ))}
            </div>
            <div className="colors">
              <label htmlFor="colors"> رنگ های موجود محصول </label>
              {allcolors.map((color) => (
                <label key={color}>
                  {color} <input type="checkbox" name={`colors-${color}`} />
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend> قیمت و تخفیف های محصول </legend>
            <input
              className="newPrInput"
              name="originalPrice"
              type="text"
              placeholder="قیمت اصلی محصول"
            />
            <input
              className="newPrInput"
              name="offerPrice"
              type="text"
              placeholder="قیمت بعد از تخفیف"
            />
            <input
              className="newPrInput"
              name="percentage"
              type="text"
              placeholder="درصد تخفیف"
            />
          </fieldset>
        </section>
        <section className="leftSide">
          <fieldset>
            <legend> عکس های مصحول شما </legend>
            <input
              type="file"
              name="image-product"
              id="imageProduct"
              onChange={handleImageChange}
            />
            {imageSrc && <img src={imageSrc} alt="Preview" />}
          </fieldset>
        </section>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "در حال ایجاد..." : "ایجاد محصول"}
        </button>
        {isError && <div className="error-message">{error.message}</div>}
      </form>
    </>
  );
}
