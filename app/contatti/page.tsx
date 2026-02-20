'use client'

import { useState } from 'react'


export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('sent')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl tracking-tight">Contatti</h1>
          <p className="mt-5 text-sm leading-relaxed text-black/65">
            Hai una domanda su una borsa o vuoi un consiglio? Scrivimi qui sotto oppure via email.
          </p>
          <p className="mt-3 text-sm text-black/65">
            Email: <a className="underline hover:text-black" href="mailto:ciao@eddyhandmade.it">ciao@eddyhandmade.it</a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="rounded-[var(--radius)] bg-white p-7 shadow-soft">
          <div className="grid gap-4">
            <Field label="Nome" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <div>
              <label className="text-sm font-medium">Messaggio</label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
            <button
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-soft disabled:opacity-60"
            >
              {status === 'sending' ? 'Invio…' : 'Invia'}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-black/70">Messaggio inviato! Ti rispondo al più presto.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-700">Errore nell’invio. Riprova o scrivi via email.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-full border border-black/10 bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  )
}
