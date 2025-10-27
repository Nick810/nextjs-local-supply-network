// src/store/useLangStore.ts
import { create } from 'zustand';

type LangState = {
  lang: string;
  setLang: (lang: string) => void;
};

export const useLangStore = create<LangState>((set) => ({
  lang: 'en',
  setLang: (lang) => {
    localStorage.setItem('preferredLang', lang);
    set({ lang });
  },
}));
