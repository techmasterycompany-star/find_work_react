export default function ButtonFull({ children }) {
  return (
    <button className="flex items-center justify-center w-full h-10 py-2 px-4  bg-primary text-white
     font-bold border-0 rounded-2sm cursor-pointer text-md">
      {children}
    </button>
  );
}
