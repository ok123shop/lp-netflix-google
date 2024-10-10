
export default function Footer() {
  return (
    <footer className="footer text-base-content p-10">

      <aside>
        <img src="Netflex-ZH.png" className="w-40 md:w-60 -translate-x-4 md:-translate-x-5"/>
        <p>
          亲历打造国内省心的合租平台
          <br />
          奈飞中文站 since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">服务</h6>
        <a className="link link-hover">奈飞合租</a>
        <a className="link link-hover">迪士尼合租</a>
        <a className="link link-hover">HBO合租</a>
        <a className="link link-hover">ChatGPT合租</a>
      </nav>
      <nav>
        <h6 className="footer-title">组织</h6>
        <a className="link link-hover" href="/concat">关于我们</a>
        <a className="link link-hover" href="/concat">联系方式</a>
      </nav>
      <nav>
        <h6 className="footer-title">协议</h6>
        <a className="link link-hover">隐私政策</a>
        <a className="link link-hover">用户协议</a>
        <a className="link link-hover">Cookie 协议</a>
      </nav>
    </footer>
  );
}
