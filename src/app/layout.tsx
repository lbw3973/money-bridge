import Navbar from "@/components/common/Navbar";
import Script from "next/script";
import ReactQueryProvider from "./ReactQueryProvider";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({ weight: ["500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const KAKAO_SDK_URL = "//dapi.kakao.com/v2/maps/sdk.js?appkey=a00d33a77c654313f467c84771f981c2&autoload=false";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        <ReactQueryProvider>
          <main className="overflow-auto pb-[56px] pt-[40px]">
            {children}
            <Navbar />
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
