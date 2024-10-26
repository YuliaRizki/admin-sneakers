import React, { useEffect, useState } from 'react'
import { Rating } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { API_SERVER } from '../helper/http-server';

const DetailPage = () => {
  let { id } = useParams()

  const [data, setData] = useState([])
  const [isLoading, setiIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setiIsLoading("Loading ...")
      setError('')
      try {
        const { data } = await API_SERVER({
          url: `/pub/${id}`,
          method: "GET",
        });
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setiIsLoading(false)
      }
    };
    fetchData();
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-1/2">
        <iframe
          src="https://lottie.host/embed/a7ff76e0-f0be-453f-a6c6-bf1cb5a82235/mlQJthDLYY.json"
          className="w-64 h-64"
        ></iframe>
      </div>
    );
  }
  // console.log(data);
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-start">
        <div className="w-full md:w-1/2 p-4 rounded-lg">
          <img src={data.imgUrl} alt="Product Photo" className="w-full max-h-[600px] object-contain rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className='text-start'>
            <h1 className='text-4xl font-graphik'>{data.name}</h1>
            <div className='pt-5'>

            <Rating>
              <Rating.Star />
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
              <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                73 reviews
              </a>
            </Rating>
            </div>
            <p className='text-lg pt-3 font-graphikMedium text-gray-400'>${data.price}</p>
            <p className='text-xl pt-7'>{data.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailPage
