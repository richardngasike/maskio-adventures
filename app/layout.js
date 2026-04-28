import '../styles/globals.css';
import Image from "next/image";
export const metadata = {
  title: 'Masikio Adventures — Maasai Mara Safari Camp',
  description: 'Experience the wild heart of Kenya...',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
