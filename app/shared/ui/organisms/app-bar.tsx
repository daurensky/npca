import { Link, useFetcher } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

const locales = [
  {
    flag: '/ru.webp',
    name: 'Русский',
    lang: 'ru',
  },
  {
    flag: '/kz.jpg',
    name: 'Қазақ',
    lang: 'kk',
  },
]

export const AppBar = () => {
  const { t } = useTranslation()
  const fetcher = useFetcher()

  const handleLanguage = (lang: string) => () => {
    fetcher.submit({ lang }, { method: 'post' })
  }

  return (
    <header className="py-8">
      <div className="max-w-screen-xl px-4 w-full mx-auto">
        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4">
          <Link
            to="/"
            className="font-heading text-3xl leading-normal font-medium"
            dangerouslySetInnerHTML={{
              __html: t(
                'Информационная площадка<br/>по освещению межнациональных отношений<br/>и национальной политики в странах Центральной Азии'
              ),
            }}
          ></Link>
          <ul className="flex gap-4">
            {locales.map(({ flag, name, lang }) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={handleLanguage(lang)}
                  className="w-10 h-10 rounded-full overflow-hidden"
                >
                  <img
                    src={flag}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
