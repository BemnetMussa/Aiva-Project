import PreviousGuestsCard from "./PreviousGuestsCard/PreviousGuestsCard";

export default function PreviousGuests() {
  return (
    <div className="flex flex-col gap-7 max-w-8/12 mb-10">
      <span className="font-semibold tracking-wide">Previous Guests</span>
      <div className="flex items-start gap-20 px-2">
        <PreviousGuestsCard />
        <PreviousGuestsCard />
      </div>
    </div>
  );
}
