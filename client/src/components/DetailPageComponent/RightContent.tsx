import SimilarListCard from "./SimilarListCard";

export default function HeadAndTitle() {
  return (
    <div className="flex-1 lg:flex flex-col gap-10 hidden">
      <span className="font-semibold tracking-wide">Similar Listings</span>
      <div className="flex flex-col gap-4 mt-10">
        {/* related listing container */}
        <SimilarListCard />
        <SimilarListCard />
        <SimilarListCard />
        <SimilarListCard />
        <SimilarListCard />
      </div>
    </div>
  );
}
