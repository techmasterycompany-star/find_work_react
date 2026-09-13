import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div
          className="
            w-[540px]
            h-[726px]
            bg-white
            rounded-[16px]
            p-[40px]
            shadow-[0px_12px_24px_0px_#0F172A0D]
          "
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}