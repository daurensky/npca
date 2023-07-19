import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useChangeLanguage = (locale: string) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale, i18n])
}
