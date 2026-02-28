import type { ReactNode } from 'react'

const DEFAULT_LINK = 'https://wa.me/919797972465'

type EmbededBannerProps = {
  /** Use a Vite-friendly path like "/banner.png" (from public) or an imported asset */
  src: string
  alt?: string
  className?: string
  /** Optional: make banner clickable - defaults to WhatsApp number link */
  href?: string
  children?: ReactNode
}

export default function EmbededBanner({
  src,
  alt = 'Banner',
  className,
  href = DEFAULT_LINK,
  children,
}: EmbededBannerProps) {
  const content = (
    <div className="rounded-2xl bg-white shadow-lg">
      <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
    </div>
  )

  return (
    <section className={`${className} overflow-hidden`}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
      {children}
    </section>
  )
}