'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/app/store/themeStore'
import { ShopifyMetaobjectsResponse } from '@/app/lib/shopify/types'
import { getMetaObjects } from '@/app/lib/shopify/api'

export function ThemeHydrator({ handle }: { handle: string }) {
  const setBackgroundColor = useThemeStore((s) => s.setBackgroundColor)
  const setMainButtonColor = useThemeStore((s) => s.setMainButtonColor)

  useEffect(() => {
    async function getThemeColors() {
      const { metaobjects }: ShopifyMetaobjectsResponse = await getMetaObjects(handle)
      const fields = metaobjects.edges[0]?.node?.fields || []

      const fieldMap = Object.fromEntries(fields.map(({ key, value }) => [key, value]))

      if (fieldMap.background_color) {
        setBackgroundColor(fieldMap.background_color)
        document.body.style.backgroundColor = fieldMap.background_color
      }

      if (fieldMap.main_button_color) {
        setMainButtonColor(fieldMap.main_button_color)
        document.documentElement.style.setProperty('--main-button-color', fieldMap.main_button_color)
      }
    }

    getThemeColors()
  }, [handle, setBackgroundColor, setMainButtonColor])

  return null
}