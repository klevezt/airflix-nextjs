import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-main-blue h-[12vh]"></header>
      {children}
      <footer className="flex justify-center w-full py-2 bg-main-blue text-white h-[5vh]">© AirFlix 2022 - {new Date().getFullYear()} - All Right Reserved</footer>
    </>
  );
}
