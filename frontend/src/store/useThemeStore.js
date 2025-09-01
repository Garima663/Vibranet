import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('vibranet-theme') || 'coffee',
  setTheme: (theme)=> {
    localStorage.setItem('vibranet-theme', theme)
    set({theme})
  },
}))