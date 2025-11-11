// import 'server-only'
 
// const dictionaries = {
//   en: () => import('./dictionaries/en.json').then((module) => module.default),
//   th: () => import('./dictionaries/th.json').then((module) => module.default),
// }
 
// export const getDictionary = async (locale: 'en' | 'th') =>
//   dictionaries[locale]()

import en from './dictionaries/en.json';
import th from './dictionaries/th.json';

export const getDictionary = async (locale: 'en' | 'th') => {
  return locale === 'th' ? th : en;
};
