import React, { useState } from "react";

import "./Admin.scss";

export default function Admin() {

  const [ imguploader , setimgupldoer ] = useState("")

  const handelimgchange = (e) => {
    const file = e;

    setimgupldoer(file.name)
  }

  return (
    <section className="HeroAdmin">
      <form action="" className="HeroForm">
        <div className="first-filed">
          <fieldset>
            <legend>اطلاعات کلی محصولات</legend>
            <input
              className="NewInput"
              type="text"
              placeholder=" عنوان محصول شما "
            />
            <input
              className="NewInput"
              type="text"
              placeholder=" عنوان اینگلیسی شما "
            />
            <input
              className="NewInput"
              type="text"
              placeholder=" برند محصول شما "
            />
          </fieldset>
          <fieldset>
            <div>
              <legend> رنگ و سایز بندی </legend>
              <label htmlFor=""> سایز های موجود محصول </label>
              <label htmlFor="">SM</label>
              <input type="checkbox" />
              <label htmlFor="">S</label>
              <input type="checkbox" />
              <label htmlFor="">M</label>
              <input type="checkbox" />
              <label htmlFor="">L</label>
              <input type="checkbox" />
              <label htmlFor="">XL</label>
              <input type="checkbox" />
            </div>
            <div>
              <label htmlFor=""> رنگ های موجود محصول </label>
              <label htmlFor="">BLUE</label>
              <input type="checkbox" />
              <label htmlFor="">BEIGE</label>
              <input type="checkbox" />
              <label htmlFor="">RED</label>
              <input type="checkbox" />
              <label htmlFor="">GREEN</label>
              <input type="checkbox" />
              <label htmlFor="">PINK</label>
              <input type="checkbox" />
            </div>
          </fieldset>{" "}
          <fieldset>
            <legend> قیمت و تخفیف های محصول </legend>
            <input
              className="NewInput"
              type="text"
              placeholder=" قیمت هر محصول "
            />
            <input
              className="NewInput"
              type="text"
              placeholder=" قیمت بعد از تخفیف "
            />
            <input
              className="NewInput"
              type="text"
              placeholder=" درصد تخفیف "
            />
          </fieldset>
        </div>
        <fieldset className="Second-filed">
          <legend> آپلود عکس </legend>
          <input type="file" onChange={(e) => handelimgchange(e.target.files[0])} />
          {imguploader && <img src={`/assets/images/${imguploader}`} alt="imguploader" /> }
        </fieldset>
      </form>
    </section>
  );
}
