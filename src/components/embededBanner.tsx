import type { ReactNode } from 'react'

type EmbededBannerProps = {
  /** Use a Vite-friendly path like "/banner.png" (from public) or an imported asset */
  src: string
  alt?: string
  className?: string
  children?: ReactNode
}

export default function EmbededBanner({
  src,
  alt = 'Banner',
  className,
  children,
}: EmbededBannerProps) {
  return (
    <section className={`${className} overflow-hidden`}>
      <div className="rounded-2xl bg-white shadow-lg">
        <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" />
      </div>
      {children}
    </section>
  )
}