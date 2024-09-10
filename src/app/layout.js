import { Manrope, Poppins } from "next/font/google";
import { Footer, Header } from "@/components/organisms";
import "./globals.scss";
import { AlertProvider, AnimateAos } from "@/components/atoms";
import { GlobalContextProvider } from "@/context";
import { Provider as ProvideRQ } from "@/utils/rq";
import NextTopLoader from "nextjs-toploader";
import { MaterialTailwindProvider } from "@/components/material-tailwind";

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext", "greek", "latin-ext"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-Manrope",
});

const poppins = Poppins({
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-Poppins",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASEURLBASE),
  title: "Portal Satu Data Muba Kabupaten Musi Banyuasin",
  description: "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A5054" },
    { media: "(prefers-color-scheme: dark)", color: "#0A5054" },
  ],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description: "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju.",
    url: "https://satudata.mubakab.go.id",
    siteName: "Satu Data Muba",
    images: [
      {
        url: "https://satudata.mubakab.go.id/logo-800x600.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans ${poppins.variable} bg-csd-dark-green min-h-[100vh]`}
      >
        <NextTopLoader
          color="#45D2B0"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #45D2B0,0 0 5px #45D2B0"
        />
        <AnimateAos />
        <AlertProvider>
          <GlobalContextProvider>
            <ProvideRQ>
              <MaterialTailwindProvider>
                <Header />
                <main className="pt-28">{children}</main>
                <Footer />
              </MaterialTailwindProvider>
            </ProvideRQ>
          </GlobalContextProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
