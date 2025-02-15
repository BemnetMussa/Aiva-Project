export default function PeopleNavChat() {
  return (
    <div className="flex justify-between items-center gap-10 px-3 py-2 rounded-xl hover:bg-cyan-100 hover:cursor-pointer">
      <div className="flex items-center gap-1">
        <img src="../../public/logo.png" className="w-12 h-12 rounded-full" />
        <span className="text-sm font-medium">Raul Fernandez</span>
      </div>
      <span className="font-medium">11:00</span>
    </div>
  );
}
