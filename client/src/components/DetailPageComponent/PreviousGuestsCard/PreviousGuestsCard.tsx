import { Star } from "lucide-react";

export default function PreviousGuestsCard() {
  return (
    <div className=" shadow-lg py-2 px-3">
      <div className="flex flex-col gap-7">
        {/*title  */}
        <div className="flex justify-between items-start pr-10">
          <div className="flex gap-3">
            <img
              className="w-[4rem] h-16 rounded-full"
              src="../../../../public/welcom_image.png"
            />
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold text-gray-800">
                Jenffier King
              </span>
              {/* we will change this to flowbit */}
              <div className="flex gap-1">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
          </div>
          <span>3d ago</span>
        </div>
        {/* reviews and comments */}
        <p className="flex max-w-full font-medium text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Necessitatibus cum, quibusdam nulla, enim similique officiis incidunt
          amet vitae, libero soluta tempore suscipit at! Debitis reiciendis
          sequi eveniet ea provident illo.
        </p>
      </div>
    </div>
  );
}
