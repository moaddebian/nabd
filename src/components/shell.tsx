"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Pulse } from "./brand";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="nav-wrap">
        <Link href="/" className="logo" aria-label="NABD, accueil">
          <Pulse />
          <span>
            NABD<small>نبض</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "nav open" : "nav"}
          aria-label="Navigation principale"
        >
          {[
            ["/", "L’initiative"],
            ["/impact", "Notre impact"],
            ["/challenge", "Le challenge"],
            ["/comprendre", "Comprendre le don"],
          ].map(([url, title]) => (
            <Link
              className={path === url ? "active" : ""}
              key={url}
              href={url}
              onClick={() => setOpen(false)}
            >
              {title}
            </Link>
          ))}
          <Link
            href="/donner"
            className="mobile-account"
            onClick={() => setOpen(false)}
          >
            Je veux donner
          </Link>
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-primary" href="/donner">
            Je veux donner <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo">
            <Pulse />
            NABD <small>نبض</small>
          </Link>
          <p>Le lien qui nous fait battre.</p>
        </div>
        <div>
          <strong>Chaque geste compte.</strong>
          <p>
            Donner, mobiliser, partager :<br />
            il y a mille façons de s’engager.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/comprendre">Sources & conseils</Link>
          <Link href="/donner">Je m’inscris</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NABD · Ensemble, pour la vie.</span>
        <span>Conçu avec cœur, au Maroc.</span>
      </div>
    </footer>
  );
}
