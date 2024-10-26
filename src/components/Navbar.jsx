import React, { useEffect, useState } from 'react'
import BSK from "../assets/BSK.svg";
import search from "../assets/search.svg";
import { Link } from "react-router-dom";


export default function Navbar({ onSearch }) {

  const [searchInput, setSearchInput] = useState('');

  // console.log(searchInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };
  return (
    <div className="mb-20">
      <nav className="bg-white fixed w-full z-20 top-0 start-0">
        <div className="container mx-auto p-3 sm:px-6 lg:px-8"> 
          <div className="flex items-center justify-between h-16">
            <div className="hidden md:flex space-x-5 flex-1">
              <Link to={'/'}>
                <h1 className="text-2xl font-graphik">HOME</h1>
              </Link>
              <Link to={'/categories'}>
                <h1 className="text-2xl font-graphik">CATEGORY</h1>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <Link to={'/'}>
                <img src={BSK} href="/" alt="BSK" className="h-10 md:h-12" />
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-6 rtl:space-x-reverse flex-1 justify-end">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  name="product"
                  id="product"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-[#f2f2f2] text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-7 p-1"
                  placeholder="Search product"
                />
                <button
                  type="submit"
                  className="inline-flex items-center py-4 px-4 text-sm font-medium text-white bg-white rounded-full border border-grey-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-grey-300"
                >
                  <img src={search} alt="search" />
                </button>
              </form>
              <a href="https://admin-bsk-ecommerce.vercel.app/">
                <button
                  type="button"
                  className="text-white text-xl font-graphik px-6 bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 focus:ring-grey-300 focus:ring-grey-300 font-medium rounded-full py-3 text-center"
                >
                  LOGIN
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}