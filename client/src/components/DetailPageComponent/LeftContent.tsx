import { BedDouble, ShowerHead } from "lucide-react";

export default function HeadAndTitle() {
  return (
    <div className="flex-2 px-1.5 mb-10 relative">
      <div className="flex flex-col gap-4">
        {/* nav for the content */}
        <div className="flex mb-10">
          <div className="w-7/12 flex justify-between self-start">
            <span className="font-semibold tracking-wide border-b-2 border-cyan-500">
              Description
            </span>
            <span className="font-semibold tracking-wide">Features</span>
            <span className="font-semibold tracking-wide">On map</span>
            <span className="font-semibold tracking-wide">Reviews</span>
          </div>
        </div>

        {/* description */}
        <span className="text-[0.9rem] w-10/12 font-medium text-gray-900">
          In the bubble room you will find a “Queen” size bed with curtains in
          case you want more privacy. You will also find an air conditioner. The
          bubble features 24/7 fresh air, a silent compressor is on all the time
          to supply fresh air during your stay. The natural temperature is very
          good, we always experience 10 degrees less (approx.) than in the city,
          you can experience cold or pleasant temperature depending on the
          season. In the surroundings you will enjoy a completely private pool
          with heater and an impressive view towards the river, outdoor kitchen
          with basic In the bubble room you will find a “Queen” size bed with
          curtains in case you want more privacy. You will also find an air
          conditioner. The bubble features 24/7 fresh air, a silent compressor
          is on all the time to supply fresh air during your stay. The natural
          temperature is very good, we always experience 10 degrees less
          (approx.) than in the city, you can experience cold or pleasant
          temperature depending on the season. In the surroundings you will
          enjoy a completely private pool with heater and an impressive view
          towards the river, outdoor kitchen with basic
        </span>
        <hr className="w-full text-gray-300" />

        {/* housing feature */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-semibold tracking-wide">House Features</span>
          <div className="flex justify-between ml-5 items-center">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex gap-3">
                <BedDouble />
                <span className="text-sm">3 Bed room</span>
              </div>
              <div className="flex gap-3">
                <ShowerHead />
                <span className="text-sm">2 shower</span>
              </div>
              <div className="flex gap-3">
                <ShowerHead />
                <span className="text-sm">2 shower</span>
              </div>
              <div className="flex gap-3">
                <ShowerHead />
                <span className="text-sm">2 shower</span>
              </div>
              <div className="flex gap-3">
                <ShowerHead />
                <span className="text-sm">2 shower</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-400 tracking-wide pr-5">
              Hosted by
            </span>
          </div>
        </div>
        <hr className="w-full text-gray-300" />

        {/* map */}
        <div className="flex flex-col w-full mb-10">
          <span className="font-semibold tracking-wide">On map</span>
          <div className="flex justify-between gap-3">
            <div className="flex flex-col mt-4">
              <div className="flex justify-between items-center gap-3 text-sm">
                <span>Address</span>
                <span>NefasSelkLafto,werda 5</span>
              </div>
              <div className="flex justify-between items-center gap-3 text-sm">
                <span>Address</span>
                <span>NefasSelkLafto,werda 5</span>
              </div>
              <div className="flex justify-between items-center gap-3 text-sm">
                <span>Address</span>
                <span>NefasSelkLafto,werda 5</span>
              </div>
              <div className="flex justify-between items-center gap-3 text-sm">
                <span>Address</span>
                <span>NefasSelkLafto,werda 5</span>
              </div>
            </div>
            <img
              src="../../public/welcom_image.png"
              className="object-cover w-6/12 h-[40vh] pr-5"
            />
          </div>
        </div>
        <hr className="w-full text-gray-300 mt-4 absolute bottom-0" />
      </div>
    </div>
  );
}
