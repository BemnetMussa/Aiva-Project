import PreviousGuestsCard from "./PreviousGuestsCard/PreviousGuestsCard";

export default function PreviousGuests() {
  return (
    <div className="flex flex-col gap-7  mb-10">
      <span className="font-semibold tracking-wide">Previous Guests</span>
      <div className="w-full grid px-5 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  lg:gap-5 lg:px-2">
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
        <PreviousGuestsCard />
      </div>
    </div>
  );
}
