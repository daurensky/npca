import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { sectionsApi } from '~/shared/api'
import { ASSETS_URL } from '~/shared/config/server'
import { i18nModel } from '~/shared/i18n'
import { Breadcrumb, BreadcrumbList, ContentSection, Main } from '~/shared/ui'

export const loader = async ({ request, params }: LoaderArgs) => {
  const sectionId = params.section as string
  const t = await i18nModel.getFixedT(request)

  const section = await sectionsApi.getSectionById({ id: sectionId })
  section.data.attributes.name = t(section.data.attributes.name)

  const cmsPublicPath = ASSETS_URL

  return json({ section, cmsPublicPath })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.section.data.attributes.name || 'Неизвестный раздел',
    },
    {
      name: 'description',
      content:
        'Мы рады Вас приветствовать на информационной площадке по освещению межнациональных отношений и национальной политики в странах Центральной Азии.',
    },
  ]
}

const Relations = () => {
  const { t } = useTranslation()
  const { section, cmsPublicPath } = useLoaderData<typeof loader>()

  return (
    <Main>
      <ContentSection>
        <BreadcrumbList>
          <Breadcrumb to="/">{t('Главная')}</Breadcrumb>
          {section.data.attributes.section.data && (
            <Breadcrumb to={`/s/${section.data.attributes.section.data.id}`}>
              {section.data.attributes.section.data.attributes.name}
            </Breadcrumb>
          )}
          <Breadcrumb>{section.data.attributes.name}</Breadcrumb>
        </BreadcrumbList>

        <h1 className="inline-block text-2xl font-medium font-heading">
          {section.data.attributes.name}
        </h1>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4"></th>
              <th className="p-4 font-normal text-left text-gray-500 w-full">
                {t('Название')}
              </th>
            </tr>
          </thead>
          <tbody>
            {section.data.attributes.sections.data.map(({ id, attributes }) => (
              <tr key={id}>
                <td className="w-16">
                  <div className="px-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-black/90">
                      folder
                    </span>
                  </div>
                </td>
                <td className="w-full">
                  <div className="pr-4">
                    <Link
                      to={`/s/${id}`}
                      className="break-all block p-4 hover:bg-black/5 transition-colors w-full rounded-xl duration-100"
                    >
                      {t(attributes.name)}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {section.data.attributes.files.data?.map(
              ({ attributes: { hash, name, url } }) => (
                <tr key={hash}>
                  <td className="w-16">
                    <div className="px-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-black/90">
                        picture_as_pdf
                      </span>
                    </div>
                  </td>
                  <td className="w-full">
                    <div className="pr-4">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`${cmsPublicPath}${url}`}
                        className="break-all block p-4 hover:bg-black/5 transition-colors w-full rounded-xl duration-100"
                      >
                        {name.replace(/\.[^/.]+$/, '')}
                      </a>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </ContentSection>
    </Main>
  )
}

export default Relations
