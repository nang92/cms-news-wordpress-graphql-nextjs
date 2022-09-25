import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { Navbar } from "../components";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <>
      <div className="container mx-auto 2xl:px-40 mb-8 xl:px-10 lg:px-8 md:px-5 sm:px-0">
        <div className="flex justify-between ">
          <div className="md:float-left block ">
            <Link href="/">
              <picture>
                <img
                  src="/logo-taichinhantoan.png "
                  className="w-80 cursor-pointer"
                  alt="logo"
                />
              </picture>
            </Link>
          </div>
          <div className="md:float-right hidden md:contents">
            <Link href="https://mua24h.com/">
              <a target="_blank">
                <picture>
                  <img
                    src="/camera-sieu-nho-mua24h.jpg"
                    className="w-full"
                    alt="ads-mua24h"
                  />
                </picture>
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* hide navbar on mobile */}
      <div className="hidden lg:block">
        <Navbar categories={categories} />
      </div>
    </>
  );
};

export default Header;
