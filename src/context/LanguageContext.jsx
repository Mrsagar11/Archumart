import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('archu_language');
    return saved === 'hi' ? 'hi' : 'en';
  });

  const changeLanguage = (lang) => {
    if (lang === 'hi' || lang === 'en') {
      setLanguage(lang);
      localStorage.setItem('archu_language', lang);
    }
  };

  // Translation helper function
  const t = (key, replacements = {}, defaultValue = '') => {
    const langTranslations = translations[language] || translations['en'];
    let text = langTranslations[key];
    
    if (text === undefined) {
      // Return defaultValue or key itself if translation is missing
      return defaultValue || key;
    }

    // Replace placeholders like {count} or {name} with values
    Object.keys(replacements).forEach((placeholder) => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
