const Image = () => {
  return (
    <div className=" w-full mb-6">
      {/* First Row: Large Image + Two Stacked Images */}
      <div className="grid grid-cols-3 gap-3 h-full">
        {/* Large Image (Takes 2 Columns) */}
        <div className="col-span-2 h-full">
          <img
            src="../../public/welcom_image.png"
            alt="Large"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Two Smaller Images (Stacked) */}
        <div className="grid grid-rows-2 gap-3 h-full">
          <img
            src="../../public/welcom_image.png"
            alt="Small 1"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="../../public/welcom_image.png"
            alt="Small 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Image;
