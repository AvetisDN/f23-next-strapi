import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SiteHeader from "@/components/site-header";
import { getGlobalData, getGlobalMeta } from "@/data/loader";
import SiteFooter from "@/components/site-footer";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalMeta();

  return {
    title: metadata?.data?.title ?? "TITLE",
    description: metadata?.data?.description ?? "DESCRIPTION",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  // console.log(globalData);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="md:p-4 flex flex-col min-h-screen">
            <SiteHeader data={globalData.data.header} />
            <main className="mt-4 flex-grow flex flex-col">{children}</main>
            <SiteFooter data={globalData.data.footer} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
