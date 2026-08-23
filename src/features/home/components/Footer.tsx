import { Icon } from '@iconify/react'
import logoNeutral from '../../../assets/brand/logo-primary-neutral.svg'

const footerGroups = [
  {
    title: 'Fitur',
    links: ['Prediksi AI', 'Risiko Stok', 'Rekomendasi', 'Per SKU'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Karir', 'Mitra', 'Kontak'],
  },
  {
    title: 'Legal',
    links: ['Ketentuan', 'Privasi', 'Kredit', 'FAQ'],
  },
]

const socialLinks = [
  { icon: 'lucide:instagram', label: 'Instagram' },
  { icon: 'lucide:facebook', label: 'Facebook' },
  { icon: 'lucide:twitter', label: 'Twitter' },
  { icon: 'lucide:linkedin', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-neutral-900)] py-16 text-white md:py-20">
      <div className="app-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div>
            <img alt="Cakra" className="h-10 w-auto" src={logoNeutral} />
            <p className="mt-5 max-w-[320px] text-body-sm text-[var(--color-neutral-400)]">
              Solusi cerdas bagi ritel modern Indonesia untuk merevolusi rantai pasok dengan efisiensi tingkat
              tinggi berbasis AI.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-label-md font-bold text-white">{group.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a className="text-body-sm text-[var(--color-neutral-400)] hover:text-white" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-sm text-[var(--color-neutral-500)]">© 2026 Cakra. All rights reserved.</p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-[var(--color-neutral-400)] transition-colors hover:bg-white/15 hover:text-white"
                href="#"
                key={social.label}
              >
                <Icon aria-hidden="true" className="size-4" icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
