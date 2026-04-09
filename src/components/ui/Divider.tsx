export default function Divider() {
  return (
    <div className="flex items-center gap-2 my-10 px-10">
      <div className="flex-1 h-px bg-gray-100" />
      <div className="w-1 h-1 rounded-full bg-gray-200" />
      <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
      <div className="w-1 h-1 rounded-full bg-gray-200" />
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
