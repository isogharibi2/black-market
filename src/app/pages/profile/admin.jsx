import React, { useEffect, useState } from "react";

import "./Admin.scss";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {

    const navigate = useNavigate();
    const queryClient = new QueryClient();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageSrc(file.name);
      console.log(file.name);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("verified")) {
      navigate("/auth/register");
    }
  })

  const mutationFn = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await axios.post(`${baseUrl}/specail-offers`, {
        title: formData.get('title'),
        enTitle: formData.get('en-title'),
        brand: formData.get('brand'),
        sizeSM: formData.get('sizeSM'),
        sizeS: formData.get('sizeS'),
        sizeM: formData.get('sizeM'),
        sizeL: formData.get('sizeL'),
        sizeXL: formData.get('sizeXL'),
        colorB: formData.get('colorB'),
        colorBe: formData.get('colorBe'),
        colorR: formData.get('colorR'),
        colorG: formData.get('colorG'),
        colorP: formData.get('colorP'),
        originalPrice: formData.get('originalPrice'),
        offerPrice: formData.get('offerPrice'),
        percentage: formData.get('percentage'),
        img: imageSrc,
        img: imageSrc,
        slug: formData.get('en-title'),
      });
      return response.data;
    } catch (err) {
      console.log(err)
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({

    mutationFn,

    onError: (error) => {
      console.error("خطا در ایجاد محصول:", error);
      alert("خطا در ایجاد محصول!");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-detail'] })
    }
  });

  return (
    <>
      <form className="newProduct" onSubmit={mutate}>
        <section className='rightSide'>
          <fieldset>
            <legend> اطلاعات کلی محصول </legend>
            <input className="newPrInput" name='title' type="text" placeholder='عنوان محصول شما' />
            <input className="newPrInput" name='en-title' type="text" placeholder='عنوان انگیلیسی محصول شما' />
            <input className="newPrInput" name='brand' type="text" placeholder='برند مصحول شما' />
          </fieldset>
          <fieldset>
            <legend> رنگ و سایزبندی </legend>
            <div className="sizes">
              <label htmlFor="sizes"> سایز های موجود محصول </label>
              <label htmlFor="siezSM"> SM </label><input type="checkbox" name="sizeSM" id="sizeSM" />
              <label htmlFor="sizeS"> S </label><input type="checkbox" name="sizeS" id="sizeS" />
              <label htmlFor="sizeM"> M </label><input type="checkbox" name="sizeM" id="sizeM" />
              <label htmlFor="sizeL"> L </label><input type="checkbox" name="sizeL" id="sizeL" />
              <label htmlFor="sizeXL"> XL </label><input type="checkbox" name="sizeXL" id="sizeXL" />
            </div>
            <div className="colors">
              <label htmlFor="colors"> رنگ های موجود محصول </label>
              <label htmlFor="colorB"> Blue </label><input type="checkbox" name="colorB" id="colorB" />
              <label htmlFor="colorBe"> Beige </label><input type="checkbox" name="colorBe" id="colorBe" />
              <label htmlFor="colorR"> Red </label><input type="checkbox" name="colorR" id="colorR" />
              <label htmlFor="colorG"> Green </label><input type="checkbox" name="colorG" id="colorG" />
              <label htmlFor="colorP"> Pink </label><input type="checkbox" name="colorP" id="colorP" />
            </div>
          </fieldset>
          <fieldset>
            <legend> قیمت و تخفیف های محصول </legend>
            <input className="newPrInput" name='originalPrice' type="text" placeholder='قیمت اصلی محصول' />
            <input className="newPrInput" name='offerPrice' type="text" placeholder='قیمت بعد از تخفیف' />
            <input className="newPrInput" name='percentage' type="text" placeholder='درصد تخفیف' />
          </fieldset>
        </section>
        <section className='leftSide'>
          <fieldset>
            <legend> عکس های مصحول شما </legend>
            <input
              type="file"
              name="image-product"
              id="imageProduct"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </fieldset>
        </section>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'در حال ایجاد...' : 'ایجاد محصول'}
        </button>
        {isError && <div className="error-message">{error.message}</div>}
      </form>
    </>
  );
}