import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
   backgroundColor: string
  mainButtonColor: string
  setBackgroundColor: (color: string) => void
  setMainButtonColor: (color: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set): ThemeState => ({
      backgroundColor: '#ffffff',
      mainButtonColor: '#000000',
      setBackgroundColor: (color) => set({ backgroundColor: color }),
      setMainButtonColor: (color) => set({ mainButtonColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
)