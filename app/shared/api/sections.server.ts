import qs from 'qs'
import { apiInstance } from './base'
import type {
  NullableStrapiSingleWrapper,
  StrapiMultipleWrapper,
  StrapiSingleWrapper,
} from './types'

export type Section = {
  name: string
  files: {
    data:
      | null
      | {
          id: 1
          attributes: {
            name: string
            alternativeText: string | null
            caption: string | null
            width: number | null
            height: number | null
            formats: unknown | null
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: string | null
            provider: string
            provider_metadata: unknown | null
          }
        }[]
  }
  section: NullableStrapiSingleWrapper<Section>
  sections: StrapiMultipleWrapper<Section>
}

export type GetSectionsListParams = {
  locale: string
}

export const getSectionsList = async ({ locale }: GetSectionsListParams) => {
  const { data } = await apiInstance.get<StrapiMultipleWrapper<Section>>(
    `/api/sections?${qs.stringify({
      populate: '*',
      filters: {
        section: {
          id: {
            $null: true,
          },
        },
      },
      locale,
    })}`
  )
  return data
}

export type GetSectionByIdParams = {
  id: number | string
  locale: string
}

export const getSectionById = async ({ id, locale }: GetSectionByIdParams) => {
  const { data } = await apiInstance.get<StrapiSingleWrapper<Section>>(
    `/api/sections/${id}`,
    { params: { populate: '*', locale } }
  )
  return data
}
