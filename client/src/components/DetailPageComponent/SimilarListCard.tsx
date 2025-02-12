import { BedDouble } from "lucide-react";

export default function SimilarListCard() {
  return (
    <div className="bg-white shadow-lg drop-shadow-md pr-3 rounded-lg">
      <div className="flex gap-3">
        <img
          className="w-4/12 object-cover rounded-tl-lg rounded-bl-lg"
          src="../../public/welcom_image.png"
        />
        <div className="flex-auto flex flex-col gap-5 px-1 py-4">
          {/* head */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wide">
                G+2 , Real Estate
              </span>
              <span className="text-[.8rem] text-gray-500 font-semibold tracking-wide">
                Addis Ababa, Gofa
              </span>
            </div>
            <span className="text-gray-800 font-medium text-[1rem]">
              40,000/mon
            </span>
          </div>
          {/* contains */}
          <div className="flex flex-col">
            <div className="flex gap-3">
              <BedDouble />
              <span className="text-sm">3 Bed room</span>
            </div>
            <div className="flex gap-3">
              <BedDouble />
              <span className="text-sm">3 Bed room</span>
            </div>
            <div className="flex gap-3">
              <BedDouble />
              <span className="text-sm">3 Bed room</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
