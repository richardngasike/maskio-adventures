import '../styles/globals.css';

export const metadata = {
  title: 'Masikio Adventures — Maasai Mara Safari Camp',
  description: 'Experience the wild heart of Kenya. Luxury tented camps, game drives, cultural visits and unforgettable safari adventures in the Maasai Mara.',
  keywords: 'Maasai Mara safari, Kenya camp, game drive, wildlife camp, Masikio Adventures, Africa safari',
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
