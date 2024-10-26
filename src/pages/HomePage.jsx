import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import { Pagination, Dropdown } from "flowbite-react";
import { API_SERVER } from "../helper/http-server";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { searchTerm = '' } = useOutletContext() || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limitPage] = useState(8);
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const onPageChange = (page) => setCurrentPage(page);

  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    getAllProducts();
  };

  const getAllProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limitPage,
        ...(sortOption && { sort: sortOption }),
        ...(filterOption && { filter: filterOption }),
        ...(searchQuery && { search: searchQuery }),
      });

      const { data } = await API_SERVER({
        url: `/public?${queryParams}`,
        method: "GET",
      });
      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [searchTerm, currentPage, limitPage, sortOption, filterOption]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex mb-6 justify-between items-center">
          <h1 className="text-black font-graphik font-extrabold text-2xl">BRAND NEW COLLECTIONS</h1>
          <div className="flex space-x-4">
            <Dropdown label="Sort" inline>
              <Dropdown.Item className="text-black" onClick={() => handleSort('createdAt')}>Latest</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleSort('-createdAt')}>Oldest</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleSort('price')}>Price: Low to High</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleSort('-price')}>Price: High to Low</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleSort('name')}>Name (A-Z)</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleSort('-name')}>Name (Z-A)</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Filter" inline>
              <Dropdown.Item className="text-black" onClick={() => handleFilter('1')}>Category 1</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleFilter('2')}>Category 2</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={() => handleFilter('3')}>Category 3</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-r-3xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Search
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products && products.map((item) => <Card key={item.id} item={item} />)}
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-end pt-10 font-graphik text-lg">
        {totalPages > 1 && (
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
