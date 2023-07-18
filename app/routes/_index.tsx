import { type V2_MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import { ContentSection, Main } from '~/shared/ui'

export const meta: V2_MetaFunction = () => {
  return [
    {
      title:
        'Информационная площадка по освещению межнациональных отношений и национальной политики в странах Центральной Азии',
    },
    {
      name: 'description',
      content:
        'Мы рады Вас приветствовать на информационной площадке по освещению межнациональных отношений и национальной политики в странах Центральной Азии.',
    },
  ]
}

const Index = () => {
  const { t } = useTranslation()

  return (
    <Main>
      <ContentSection>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full">
            <img src="/bg.jpg" alt="" className="rounded-xl" />
          </div>
          <div className="flex flex-col items-start gap-8 w-full">
            <h1 className="text-2xl leading-normal">
              {t(
                'Целью нашего сайта является формирование полного представления в области межэтнических и межконфессиональных отношений и популяризация данных знаний через информационную площадку в форме тематического сайта.'
              )}
            </h1>
            <div className="space-y-4">
              <p>{t('На сайте вы можете увидеть следующие материалы')}</p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  {t(
                    'Законодательная база в сфере национальной политики в странах Центральной Азии'
                  )}
                </li>
                <li>
                  {t(
                    'Систематизированный научный материал и экспертный опыт в области межнациональных и межконфессиональных отношений на одной информационной площадке'
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>
    </Main>
  )
}

export default Index
