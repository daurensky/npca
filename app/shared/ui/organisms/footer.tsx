import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { CONTACT_EMAIL } from '~/shared/config/client'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="py-8 bg-black/90 text-white">
      <div className="max-w-screen-xl w-full px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <img
              src="/logo.png"
              alt={
                'Некоммерческое акционерное общество "ПАВЛОДАРСКИЙ ПЕДАГОГИЧЕСКИЙ УНИВЕРСИТЕТ" имени Әлкей Марғұлана'
              }
              width={300}
            />
          </div>
          <div className="flex flex-col lg:items-end">
            <p>{t('Контакты')}</p>
            <Link to={`mailto:${CONTACT_EMAIL}`} className="underline">
              {CONTACT_EMAIL}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
