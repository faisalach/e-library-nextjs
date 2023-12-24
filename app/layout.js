import "./globals.css";

export const metadata = {
  title: "Library",
  description: "Perpus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
