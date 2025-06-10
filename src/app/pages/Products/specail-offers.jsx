import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./specail-offers.scss";

import { baseUrl } from "@app/helpers/variables";

export default function SpecailOffer() {
  const [ProductDetails, SetProductDetails] = useState([]);
  const [selectedColor, setselectedColor] = useState(null);
  const [selectedSize, setselectedSize] = useState(null);
  const [ Btns , SetBtns ] = useState("")

  const { slug } = useParams();

  useEffect(() => {
    const GetProductDeatls = async () => {
      const response = await axios.get(
        `${baseUrl}/specail-offers?slug=${slug}`
      );
      SetProductDetails(response.data);
    };
    GetProductDeatls();
  });

  

  return (
    <>
      <section className="HeroSpecialOffers">
        <div className="CallBackDiv">
          <ul className="CallBakUl">
            <li>home</li>
            <img src="/assets/icons/CALLBACKARROW.png" alt="" />
            <li>products</li>
          </ul>
        </div>
        {ProductDetails?.map((product) => (
          <div className="ProductAllDEtails" key={product.id}>
            <div className="TextHerosPD">
              <div>
                <h1 className="TitleTextPD">{product.title}</h1>
                <h1 className="ENtitlePD">{product.enTitle}</h1>
              </div>
              <div className="ColorVSSizes">
                <ul className="SizePcker">
                  {product.sizes?.map((size, index) => (
                    <li
                      className={selectedSize === index ? "selectedSize" : ""}
                      onClick={() => handelSize(index)}
                      key={index}
                    >
                      {" "}
                      {size}{" "}
                    </li>
                  ))}
                </ul>
                <ul className="ColorPicker">
                  {product.colors.map((color, index) => (
                    <li
                      className={selectedColor === index ? "selectedColor" : ""}
                      onClick={() => handelColor(index)}
                      key={index}
                    >
                      {" "}
                      {color}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="PdDetails">
                <span>{product.originalPrice}</span>
                <span>{product.brand}</span>
              </div>
              {/* <span>{product.offerPrice}</span> */}
              {/* <span>{product.percentage}</span> */}
              <div className="AddCart">
                <button>
                  افزودن به سبد خرید <div className="bag"></div>
                </button>
              </div>
            </div>
            <div className="ImgHerosPD">
              <img src={product.img} alt="" />
            </div>
          </div>
        ))}
      </section>
      <section className="PDinformation">
        <div id="BTNS" className={Btns}>
          <button
            onClick={() => SetBtns("Details")}
          >
            توضیحات{" "}
          </button>
          <button
            onClick={() => SetBtns("Information")}
          >
            مشخصات
          </button>
          <button
            onClick={() => SetBtns("comments")}
          >
            دیدگاه کاربران
          </button>
        </div>

        {Btns === "Details" ? (
          <div className="DetailsINFO">
            <div className="Texts">
              {ProductDetails?.map((product) => (
                <div key={product.id}>
                  <h3>{product.title}</h3>
                </div>
              ))}
              <ul>
                <li> پارچه پشمی درجه یک </li>
                <li>طراحی برجسته</li>
                <li>دوخته شده با نخ بز</li>
                <li>رنگ طبیعی</li>
              </ul>
              <p>
                کت و شلوار مردانه شامل یک کت، یک شلوار و گاهی یک جلیقه است که از
                یک نوع پارچه دوخته‌شده‌اند. توجه کنید که یک شلوار و یک کت با
                پار‌چه‌ای مشابه به عنوان کت و شلوار شناخته نمی‌شود و حتماً باید
                در دوخت تمامی آیتم‌ها از یک پارچه استفاده شده باشد. امروزه
                مدل‌های کت و شلوار زیادی برای انتخاب وجود دارد، اما همه آن‌ها بر
                اساس سه سبک کلی طبقه‌بندی می‌شوند: آمریکایی، اروپایی/ایتالیایی و
                انگلیسی. اگرچه برخی از عناصر هر یک از این سبک‌ها مشابه سبک‌های
                دیگر هستند، اما همچنان به عنوان یک راهنمای مفید در تعیین اینکه
                کدام مدل برش برای تیپ بدنی شما مناسب‌تر است، در نظر گرفته
                می‌شوند.
              </p>
            </div>
            <div>
              {ProductDetails?.map((product) => (
                <div key={product.id}>
                  <img src={product.img} alt="" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
