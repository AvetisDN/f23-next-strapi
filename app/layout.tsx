import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import SiteHeader from "@/components/layout/site-header";
import { getGlobalData, getGlobalMeta } from "@/data/loader";
import SiteFooter from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/toaster";

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
          <div className="flex flex-col min-h-screen">
            <SiteHeader data={globalData.data.header} />
            <main className="flex-grow flex flex-col">{children}</main>
            <SiteFooter data={globalData.data.footer} />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
