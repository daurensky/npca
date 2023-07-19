// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node' // or cloudflare/deno
import { SESSION_SECRET } from '../config/server'

type SessionData = {
  lang: 'kk' | 'ru'
}

type SessionFlashData = {}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: [SESSION_SECRET],
      secure: true,
    },
  })

export { getSession, commitSession, destroySession }
