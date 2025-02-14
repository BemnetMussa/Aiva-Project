import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images: string[] = [
  "../../public/welcom_image.png",
  "../../public/welcom_image.png",
  "../../public/welcom_image.png",
  "../../public/welcom_image.png",
  "../../public/welcom_image.png",
  "../../public/welcom_image.png",
];

const Image: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fullImage, setFullImage] = useState<string | null>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Next Slide Functions
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous Slide Functions
  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Open full image modal
  const openFullImage = (imgSrc: string): void => {
    setFullImage(imgSrc);
  };

  // Close modal
  const closeFullImage = (): void => {
    setFullImage(null);
  };

  return (
    <div className="w-full mb-6">
      {/* Grid Layout for Large Screens */}
      <div className="w-full h-full hidden lg:block">
        <div className="grid grid-cols-3 gap-3 h-full">
          <div className="col-span-2 h-full">
            <img
              src={images[0]}
              alt="Large"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openFullImage(images[0])}
            />
          </div>
          <div className="grid grid-rows-2 gap-3 h-full">
            {images.slice(1, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Small ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => openFullImage(img)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Slider for Small Screens */}
      <div className="relative w-full h-full mx-auto  overflow-hidden rounded-sm lg:hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-96 object-cover flex-shrink-0 cursor-pointer"
              onClick={() => openFullImage(img)}
            />
          ))}
        </div>

        {/* Nav Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicating button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-gray-300" : "bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Full Image Modal with Slider */}
      {fullImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeFullImage} // Close modal when clicking outside image
        >
          <div
            className="relative w-full max-w-5xl overflow-x-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when scrolling
          >
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Full Image ${index}`}
                  className="w-full mx-w-4xl h-auto object-contain rounded-lg"
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>

            <button
              onClick={closeFullImage}
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
