import "./globals.css";

export const metadata = {
  title: 'Zot Rooms | Study Space Finder',
  description: 'Browse available UC Irvine study rooms with a refined split-panel interface.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
