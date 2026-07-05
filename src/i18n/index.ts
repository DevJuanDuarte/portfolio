import es from './es.json';
import en from './en.json';

export type Lang = 'es' | 'en';

const translations: Record<Lang, Record<string, unknown>> = { es, en };

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function useTranslations(lang: Lang) {
  const dict = translations[lang];

  return {
    t: (key: string): string => {
      const value = getNestedValue(dict, key);
      if (typeof value === 'string') return value;
      console.warn(`Translation missing for key "${key}" in lang "${lang}"`);
      return key;
    },
    tArray: <T = Record<string, string>>(key: string): T[] => {
      const value = getNestedValue(dict, key);
      if (Array.isArray(value)) return value as T[];
      console.warn(`Translation array missing for key "${key}" in lang "${lang}"`);
      return [];
    },
  };
}
