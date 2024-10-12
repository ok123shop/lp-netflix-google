
import "./globals.css";
import Header from "@/components/Header";
import Body from "@/components/Body";

export const metadata = {
  title: "环球流媒体 - 奈飞智能合租平台 稳定靠谱的合租平台",
  description: "环球流媒体 奈飞合租 奈飞拼车 奈飞共享账号",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`antialiased hide-scrollbar`}
      >
        <div id="web_bg"></div>
        <Header/>
        <Body>
          {children}
        </Body>
      </body>
    </html>
  );
}
