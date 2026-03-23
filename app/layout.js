import "./globals.css";

export const metadata = {
  title: "銀心藥時站 | 長者注意力帶動活動",
  description: "台灣社區關懷據點指導員可直接使用的服藥記憶與注意力訓練活動網站。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
