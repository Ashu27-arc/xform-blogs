

type EmbededWhatsappProps = {
  message?: string
  phoneNumber?: string
  className?: string
}


export default function EmbededWhatsapp({
  message = "Hello! I'd like to know more about your courses.",
  phoneNumber = '919797972465',
  className = '',
}: EmbededWhatsappProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <section className={`w-full max-w-[800px] mx-auto overflow-hidden ${className}`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <img 
          src="/whatsapp-image.webp" 
          alt="Chat on WhatsApp" 
          className="w-full h-auto block rounded-xl shadow-md"
        />
      </a>
    </section>
  )
}
