import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio.vercel.app"),
  title: "Pranav Patel | Data · ML · AI",
  description: "Portfolio of Pranav Patel, a Computer Science & Engineering graduate pursuing opportunities across Data Analytics, Data Science, Machine Learning, and AI/ML.",
  keywords: ["Pranav Patel", "Data Analyst", "Data Scientist", "Machine Learning", "AI ML", "Python", "Power BI", "Portfolio"],
  openGraph: {
    title: "Pranav Patel | Data · ML · AI",
    description: "Building data, analytics, and machine learning solutions with purpose.",
    type: "website",
    url: "https://your-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav Patel | Data · ML · AI",
    description: "Building data, analytics, and machine learning solutions with purpose.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
