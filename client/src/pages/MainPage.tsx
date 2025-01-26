import * as React from "react";
import  PropertyCard  from "../components/PropertyCard";
import  SearchForm  from "../components/SearchForm";
import { Pagination } from "../components/Pagination";
import { SearchFormData } from "../components/types";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


const propertyData = [
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor vero voluptatem, quia odio consectetur sint molestiae assumenda minus rem perspiciatis, sunt quibusdam sequi ad laboriosam illum. Vel, illum quisquam ad unde velit cumque iure consectetur qui praesentium, officia nesciunt perspiciatis? Earum possimus nihil ratione ab molestias deserunt, illo eum odit vero, illum sit nesciunt commodi unde nisi consectetur beatae quisquam. Accusamus, perferendis soluta. Labore necessitatibus velit mollitia quasi, laborum doloremque temporibus maxime molestias esse quis minima voluptates, reiciendis, cupiditate alias obcaecati molestiae nostrum facilis dolores ducimus impedit ipsam neque tempora illum! Cumque explicabo, laudantium nihil voluptatibus sint facilis ea quaerat. ',
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
     description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor vero voluptatem, quia odio consectetur sint molestiae assumenda minus rem perspiciatis, sunt quibusdam sequi ad laboriosam illum. Vel, illum quisquam ad unde velit cumque iure consectetur qui praesentium, officia nesciunt perspiciatis? Earum possimus nihil ratione ab molestias deserunt, illo eum odit vero, illum sit nesciunt commodi unde nisi consectetur beatae quisquam. Accusamus, perferendis soluta. Labore necessitatibus velit mollitia quasi, laborum doloremque temporibus maxime molestias esse quis minima voluptates, reiciendis, cupiditate alias obcaecati molestiae nostrum facilis dolores ducimus impedit ipsam neque tempora illum! Cumque explicabo, laudantium nihil voluptatibus sint facilis ea quaerat. ',

    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },
   {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/9551b30ffd791b24c187aced272c5c6ff64143110467cc272de2a8ebba209e1b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    heartIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/e4754955a5525e5dc6d8c2c0e2b3acd745bcd2ad07da3ddc3d9b5325274c9020?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    shareIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/4a408235fb38e98ad478648d8732bda0e0b413b3fad0bd9e972f654e90eb05ca?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    title: "G+2 , Real Estate",
    location: "Addis Ababa, Gofa",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 95,
    rating: 5.0,
    pricePerNight: 149,
    bedroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/aa7dcd1fe32a40832afea7e3d37e922a55e6c5335edfeb813d2e3ac08d3b8b6f?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    bathroomIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/763b3bac35d3f53164d71d0437aff1f8baa1734bda7caadf0933c5559d0d76f9?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    squareFeetIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/951c113e1ae7c2e467b3bc29ff40457cd9c91f331f81af3c4e33f9862d190c84?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
    ratingIconUrl:
      "https://cdn.builder.io/api/v1/image/assets/e680e7b451be4bf7a4bb6dfb186f609f/60824f7a6a30c3a5c74328ef290634fec4022ec6dff15d339deede88ce7f7a4b?apiKey=e680e7b451be4bf7a4bb6dfb186f609f&",
  },

  // Repeat similar objects for other properties
];

export const ZimanyHome: React.FC = () => {
  const handleSearch = (data: SearchFormData) => {
    console.log("Search data:", data);
  };

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
  };

  return (
    <div className="flex overflow-hidden flex-col items-center w-full pt-14 bg-white border border-cyan-400 border-solid shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      {/* Navbar section */}
      <Navbar/>
    
      <div className="flex relative flex-col h-[75vh] items-center self-stretch px-20 pt-28 pb-40 w-full  text-center text-white max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="\welcom_image.png"
          alt="Welcome background"
          className="object-cover absolute inset-0 size-full h-[90%]"
        />
        <div className="flex mt-10 relative flex-col mb-0 ml-8 max-w-full w-[721px] max-md:mb-2.5">
          <h1 className="self-center text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
            Welcome to Zemenay ተከራይ
          </h1>
          <p className="text-xl font-medium leading-8 max-md:max-w-full">
            <br />
            Your Gateway to Unique and Affordable Stays
            <br />
            Discover incredible homes and unforgettable experiences around the
            world.
          </p>
        </div>
      </div>

      <SearchForm />

      <div className="mt-24 w-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {propertyData.map((property, index) => (
            <div
              key={index}
              className=" "
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>

     

      {/* Footer section */}
      <div className="flex flex-col justify-center items-center self-stretch px-16 py-24 mt-5 bg-gray-50 max-md:px-5 max-md:max-w-full">
        <Footer />
      </div>
    </div>
  );
};
