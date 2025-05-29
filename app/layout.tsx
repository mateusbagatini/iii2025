import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "iii Exhibition | Beginning 2025",
  description: "7.4 (Fri) ~ 7.7 (Mon) - 11:00 ~ 19:00 @UTokyo iii Main Building B1 | Site Coming Soon",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  openGraph: {
    title: "iii Exhibition | Beginning 2025",
    description: "7.4 (Fri) ~ 7.7 (Mon) - 11:00 ~ 19:00 @UTokyo iii Main Building B1 | Site Coming Soon",
    url: "https://iii-exhibition.vercel.app",
    siteName: "iii Exhibition",
    images: [
      {
        url: "/images/sns-share.png",
        width: 1200,
        height: 630,
        alt: "iii Exhibition | Beginning 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iii Exhibition | Beginning 2025",
    description: "7.4 (Fri) ~ 7.7 (Mon) - 11:00 ~ 19:00 @UTokyo iii Main Building B1 | Site Coming Soon",
    images: ["/images/sns-share.png"],
    creator: "@iii_exhibition",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
