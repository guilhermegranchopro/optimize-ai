// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/gpu">GPU Optimization</Link>
          </li>
          <li>
            <Link href="/forecast">Ecological Impact Forecast</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
