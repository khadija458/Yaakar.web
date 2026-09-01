'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'XOF' | 'EUR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountFcfa: number, options?: { isMonthly?: boolean; isAnnual?: boolean; showRawNumber?: boolean }) => string;
  getCurrencySymbol: () => string;
  getCurrencyLabel: () => string;
  convertAmount: (amountFcfa: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EUR_RATE = 655.957; // 1 EUR = 655.957 FCFA
const USD_RATE = 600;     // 1 USD ~ 600 FCFA

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('XOF');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yakaar_currency') as Currency;
      if (saved && (saved === 'XOF' || saved === 'EUR' || saved === 'USD')) {
        setCurrencyState(saved);
      }
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yakaar_currency', c);
    }
  };

  const convertAmount = (amountFcfa: number): number => {
    if (currency === 'EUR') {
      return Math.round(amountFcfa / EUR_RATE);
    }
    if (currency === 'USD') {
      return Math.round(amountFcfa / USD_RATE);
    }
    return amountFcfa;
  };

  const getCurrencySymbol = (): string => {
    if (currency === 'EUR') return '€';
    if (currency === 'USD') return '$';
    return 'FCFA';
  };

  const getCurrencyLabel = (): string => {
    if (currency === 'EUR') return 'EUR (€)';
    if (currency === 'USD') return 'USD ($)';
    return 'FCFA (XOF)';
  };

  const formatPrice = (
    amountFcfa: number, 
    options?: { isMonthly?: boolean; isAnnual?: boolean; showRawNumber?: boolean }
  ): string => {
    const converted = convertAmount(amountFcfa);

    let period = '';
    if (options?.isMonthly) {
      period = currency === 'XOF' ? '/mois' : currency === 'EUR' ? '/mois' : '/mo';
    } else if (options?.isAnnual) {
      period = currency === 'XOF' ? '/an' : currency === 'EUR' ? '/an' : '/yr';
    }

    if (currency === 'EUR') {
      return `${converted.toLocaleString('fr-FR')} €${period}`;
    }
    if (currency === 'USD') {
      return `$${converted.toLocaleString('en-US')}${period}`;
    }
    return `${converted.toLocaleString('fr-FR')} FCFA${period}`;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        formatPrice, 
        getCurrencySymbol, 
        getCurrencyLabel,
        convertAmount 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
