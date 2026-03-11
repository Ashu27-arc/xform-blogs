import type { MouseEvent, ReactNode } from 'react'

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
    <div className="bg-white m-0 p-0">
      <img src={src} alt={alt} className="w-full h-auto block m-0 p-0" loading="lazy" />
    </div>
  )

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href && typeof window !== 'undefined') {
      // When in iframe, ensure link opens (some browsers block default anchor behavior)
      const inIframe = window.self !== window.top
      if (inIframe) {
        e.preventDefault()
        window.top!.open(href, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <section className={`${className} overflow-hidden m-0 p-0`}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer m-0 p-0" onClick={handleClick}>
          {content}
        </a>
      ) : (
        content
      )}
      {children}
    </section>
  )
}