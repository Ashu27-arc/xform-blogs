import React, { useId, useMemo, useState } from 'react'
import { submitLead } from '../services/api'

type FormValues = {
  name: string
  email: string
  phone: string
  course: string
  consent: boolean
}

const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.09 0-7.5 2.15-7.5 4.5V20.5h15v-1.75c0-2.35-3.41-4.5-7.5-4.5Z"
      fill="currentColor"
    />
  </svg>
)

const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M20 6.75H4c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h16c.69 0 1.25-.56 1.25-1.25V8c0-.69-.56-1.25-1.25-1.25Zm-.59 2.12L12.5 13.2a1 1 0 0 1-1 0L4.59 8.87a.75.75 0 1 1 .82-1.25L12 11.7l6.59-4.08a.75.75 0 1 1 .82 1.25Z"
      fill="currentColor"
    />
  </svg>
)

const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h2.92a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.13 2.2Z"
      fill="currentColor"
    />
  </svg>
)

const IconBook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M6.75 4.5h10.5A1.75 1.75 0 0 1 19 6.25V18.5a.75.75 0 0 1-1.09.67A10.6 10.6 0 0 0 12 18a10.6 10.6 0 0 0-5.91 1.17A.75.75 0 0 1 5 18.5V6.25A1.75 1.75 0 0 1 6.75 4.5Z"
      fill="currentColor"
    />
  </svg>
)

const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M7 10l5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function EmbededForm() {
  const baseId = useId()
  const page = useMemo(() => (typeof window !== 'undefined' ? window.location.href : ''), [])
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    course: '',
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onChange =
    <K extends keyof FormValues>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const next =
        e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.value
      setValues((v) => ({ ...v, [key]: next as FormValues[K] }))
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setIsSubmitted(false)
    try {
      await submitLead({
        name: values.name || undefined,
        email: values.email || undefined,
        phone: values.phone,
        course: values.course || undefined,
        consent: values.consent,
        source: 'xform-blogs',
        page,
      })

      setIsSubmitted(true)
      setValues({
        name: '',
        email: '',
        phone: '',
        course: '',
        consent: false,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-[420px] rounded-2xl bg-[#0B77B6] px-5 py-6 text-white shadow-lg overflow-hidden">
      <header className="mb-5 text-center">
        <div className="text-xl font-semibold leading-tight">Get</div>
        <div className="text-2xl font-extrabold tracking-wide leading-tight">NEET - 2026</div>
        <div className="text-xl font-semibold leading-tight">Updates</div>
      </header>
  
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <IconUser className="h-6 w-6" />
          </span>
          <input
            id={`${baseId}-name`}
            value={values.name}
            onChange={onChange('name')}
            placeholder="Name"
            autoComplete="name"
            className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/80"
          />
        </div>
  
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <IconMail className="h-6 w-6" />
          </span>
          <input
            id={`${baseId}-email`}
            value={values.email}
            onChange={onChange('email')}
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/80"
          />
        </div>
  
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <IconPhone className="h-6 w-6" />
          </span>
          <input
            id={`${baseId}-phone`}
            value={values.phone}
            onChange={onChange('phone')}
            placeholder="Phone*"
            inputMode="tel"
            autoComplete="tel"
            required
            className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/80"
          />
        </div>
  
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <IconBook className="h-6 w-6" />
          </span>
          <select
            id={`${baseId}-course`}
            value={values.course}
            onChange={onChange('course')}
            className="h-12 w-full appearance-none rounded-xl bg-white pl-12 pr-10 text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/80"
          >
            <option value="" disabled>
              Course
            </option>
            <option value="neet">NEET</option>
            <option value="neet-foundation">NEET Foundation</option>
            <option value="crash-course">Crash Course</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            <IconChevronDown className="h-6 w-6" />
          </span>
        </div>
  
        <label
          htmlFor={`${baseId}-consent`}
          className="flex items-start gap-3 text-left text-sm leading-snug text-white/95"
        >
          <input
            id={`${baseId}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={onChange('consent')}
            className="mt-1 h-4 w-4 rounded border-white/70 bg-white/20 text-emerald-400 ring-offset-[#0B77B6] focus:ring-2 focus:ring-white/70"
          />
          <span>
            By submitting this form you agree to our{' '}
            <a href="#" className="font-medium underline underline-offset-2">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium underline underline-offset-2">
              TC
            </a>
          </span>
        </label>
  
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-12 w-full rounded-xl bg-[#4AD7C3] font-extrabold tracking-wide text-white shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'PLEASE WAIT…' : 'GET STARTED FOR FREE'}
        </button>
  
        {submitError ? (
          <p className="text-sm text-rose-100/95" role="alert">
            {submitError}
          </p>
        ) : null}
  
        {isSubmitted ? (
          <p className="text-sm text-emerald-100/95" role="status">
            Submitted successfully. We'll contact you soon.
          </p>
        ) : null}
      </form>
    </section>
  )
}