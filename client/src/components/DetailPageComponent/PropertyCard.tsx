const PropertyCard = () => {
  return (
    <div className="bg-white hidden  lg:flex flex-col gap-5 px-5 py-4 mt-6 rounded-lg h-full shadow-2xl drop-shadow-xl w-4/12">
      {/* name */}
      <div className="flex gap-4">
        <img
          src="../../public/logo.png"
          className="w-3/12 rounded-full object-contain"
        />

        <div className="flex flex-col h-full ">
          <h1 className="text-md font-medium tracking-wider text-gray-900 ">
            Almaznesh Kasa
          </h1>
          <p className="text-sm tracking-wider font-medium text-gray-500">
            Hosted by
          </p>
          <p className="text-[0.7rem] tracking-widest text-gray-500">online</p>
        </div>
      </div>
      {/* lower */}

      <div className="flex flex-col gap-4 h-full">
        <span className="text-2xl font-black tracking-wide">
          G+2 , Real Estate
        </span>
        <span className="text-sm font-semibold text-gray-400">
          Addis Ababa, Gofa
        </span>
        <hr className="text-gray-200" />
      </div>
      {/* price tag */}
      <div className="flex justify-between gap-5">
        <div>
          <p>5000/month</p>
        </div>
        <div className="flex gap-2">
          <span>5.0</span>
          <span>7 review</span>
        </div>
      </div>

      {/* things avialable */}

      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between">
          <span>Occupancy taxes and fee</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span>$10</span>
        </div>
      </div>
      {/* buttons */}

      <div className="flex flex-col gap-3 h-full">
        <button className="text-white bg-cyan-500 py-3 text-sm rounded-xl font-medium ">
          Show Phone Number
        </button>
        <button className="text-white bg-cyan-500 py-3 text-sm rounded-xl  font-medium ">
          Message
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
