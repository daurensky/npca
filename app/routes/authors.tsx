import { Breadcrumb, BreadcrumbList, ContentSection, Main } from '~/shared/ui'
import authorsList from '~/shared/data/authors.json'
import { useTranslation } from 'react-i18next'

const Authors = () => {
  const { t, i18n } = useTranslation()

  return (
    <Main>
      <ContentSection>
        <BreadcrumbList>
          <Breadcrumb to="/">{t('Главная')}</Breadcrumb>
          <Breadcrumb>{t('Разработчики')}</Breadcrumb>
        </BreadcrumbList>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {authorsList.map(({ image, name, bio }) => (
            <div key={name} className="flex flex-col items-center">
              <img
                src={image}
                alt=""
                className="mb-4 rounded-md bg-gradient-to-b from-[#564e3a] to-[#6c6961]"
              />
              <p className="w-full mb-2 text-lg text-center">{name}</p>
              <p className="text-center">{bio[i18n.language as 'ru' | 'kk']}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </Main>
  )
}

export default Authors
