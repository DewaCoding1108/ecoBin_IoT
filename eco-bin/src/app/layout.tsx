import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco-Bin Trash Station",
  description: "Change your waste to save the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className='bg-gray-200 flex flex-col items-center py-20'>
        <h1 className="text-5xl text-black">eBin Trash Station</h1>
        <h1 className="text-xl text-black">Change your waste to save the world!</h1>
      </header>
      <main className="bg-gray-200 h-[60vh]">
        {children}
      </main>
      {/* <footer className=" bg-black w-full flex justify-center p-2">
          <h1 className = "text-white">
            @EcoBin Tugas Besar Rekayasa Sistem dan Teknologi Informasi
          </h1>
        </footer> */}
      </body>
      
    </html>
  );
}
