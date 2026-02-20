import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))

  // TODO: integrate an email provider (Resend, Sendgrid, etc.)
  // For now, we just log on the server.
  console.log('[contact]', body)

  return NextResponse.json({ ok: true })
}
