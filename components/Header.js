
export default function Header() {
  return (
    <div className="h-16 bg-zinc-900 bg-opacity-60 flex items-center px-4 fixed top-0 left-0 w-full z-50 overflow-hidden">
        <a className="block h-10 overflow-hidden" href="/">
            <img src="Logo.png" className="h-10 "/>
        </a>
        <div className="flex-1 flex w-full items-center justify-end">
            <ul className="menu menu-horizontal px-1">
                <li><a href="/">首页</a></li>
                <li><a href="/concat">帮助</a></li>
            </ul>
        </div>
    </div>
  );
}
