import { cssBundleHref } from '@remix-run/css-bundle'
import type { ActionArgs, LinksFunction, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { AppBar, ContentSection, Footer } from '~/shared/ui'
import { sectionsApi } from './shared/api'
import { i18nLib, i18nModel } from './shared/i18n'
import { sessionModel } from './shared/session'
import styles from './tailwind.css'

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await i18nModel.getLocale(request)
  const sections = await sectionsApi.getSectionsList()
  return json({ locale, sections })
}

export const action = async ({ request }: ActionArgs) => {
  const lang = (await request.formData()).get('lang')
  const session = await sessionModel.getSession(request.headers.get('cookie'))

  session.set('lang', lang === 'kk' ? 'kk' : 'ru')

  return redirect(request.headers.get('referer') || '/', {
    headers: {
      'Set-Cookie': await sessionModel.commitSession(session),
    },
  })
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: styles },
]

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
}

const App = () => {
  const { locale, sections } = useLoaderData<typeof loader>()
  const { i18n, t } = useTranslation()

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  i18nLib.useChangeLanguage(locale)

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Links />
      </head>
      <body className="flex flex-col h-screen font-body">
        <AppBar />
        <Outlet />
        <ContentSection className="bg-[#f0f0f0]">
          <h2 className="text-2xl font-medium font-heading">{t('Разделы')}</h2>
          <ul className="grid lg:grid-cols-3 gap-4">
            {sections.data.map(({ id, attributes }) => (
              <li key={id} className="flex">
                <Link
                  to={`/s/${id}`}
                  className="p-8 text-xl bg-black/90 text-white font-heading font-medium rounded-xl w-full text-center flex justify-center items-center hover:bg-black transition-colors"
                >
                  {t(attributes.name)}
                </Link>
              </li>
            ))}
          </ul>
        </ContentSection>
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default App
