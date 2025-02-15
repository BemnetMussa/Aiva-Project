import { MoveLeft } from "lucide-react";
import Image from "../components/DetailPageComponent/Image";
import PropertyCard from "../components/DetailPageComponent/PropertyCard";
import HeadAndTitle from "../components/DetailPageComponent/HeadAndTitle";
import LeftContent from "../components/DetailPageComponent/LeftContent";
import RightContent from "../components/DetailPageComponent/RightContent";
import PreviousGuests from "../components/DetailPageComponent/PreviousGuests";

const DetailPropertyPage = () => {
  return (
    <div className="w-full py-2">
      <div className="container mx-auto  px-2">
        <div className="flex flex-col gap-2">
          <button className="mb-4 mt-2">
            <MoveLeft />
          </button>

          {/* image and card */}
          <div className="flex gap-5 ">
            {/* image */}
            <Image />

            {/* organizing card */}
            <PropertyCard />
          </div>

          {/* description and everything */}
          <div className="flex flex-col">
            {/* head and title */}
            <HeadAndTitle />

            {/* contents */}
            <div className="flex">
              {/* left content */}

              <LeftContent />

              {/* content right */}

              <RightContent />
            </div>
          </div>

          {/* previous gustes */}
          <PreviousGuests />
        </div>
      </div>
    </div>
  );
};

export default DetailPropertyPage;
