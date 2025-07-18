import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import RootStoreProvider from "@/store/StoreProvider";
import { initState } from "@/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootStoreProvider initState={initState}>
          <Nav></Nav>
          {children}
          <Footer></Footer>
        </RootStoreProvider>
      </body>
    </html>
  );
}
