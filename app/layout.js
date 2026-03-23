import "./globals.css";

export const metadata = {
  title: "山海共生工作坊 | 長者活動網頁",
  description: "社區關懷據點可直接使用的長者活動網頁。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
