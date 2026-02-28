import React, { useEffect, useState } from 'react'
import { fetchBlogFaqs, type BlogFaq } from '../services/api'

type EmbededeFAQsProps = {
  /** Blog slug to fetch FAQs for. If not provided, uses ?slug= from URL */
  slug?: string
  className?: string
}

/** Process FAQ answer HTML so links break out of iframe (target="_top") */
const processFaqAnswer = (html: string) => {
  if (!html) return ''
  return html.replace(/<a\s+/gi, '<a target="_top" rel="noopener noreferrer" ')
}

export default function EmbededeFAQs({ slug: propSlug, className }: EmbededeFAQsProps) {
  const [faqs, setFaqs] = useState<BlogFaq[]>([])
  const [loading, setLoading] = useState(true)

  const slug =
    propSlug ||
    (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('slug') : null)

  useEffect(() => {
    if (!slug?.trim()) {
      setLoading(false)
      return
    }
    fetchBlogFaqs(slug.trim())
      .then((data) => setFaqs(data))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className={`rounded-xl bg-white p-6 shadow-sm animate-pulse ${className || ''}`}>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (!faqs.length) {
    return null
  }

  return (
    <section
      className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${className || ''}`}
    >
      <h2 className="text-lg font-bold text-gray-800 px-4 py-3 bg-gray-50 border-b border-gray-200">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group [&_summary::-webkit-details-marker]:hidden [&_summary::marker]:hidden">
            <summary className="px-4 py-3 cursor-pointer list-none hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
            </summary>
            <div
              className="px-4 pb-3 pt-0 text-gray-600 text-sm leading-relaxed [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800"
              dangerouslySetInnerHTML={{ __html: processFaqAnswer(faq.answer) }}
            />
          </details>
        ))}
      </div>
    </section>
  )
}
