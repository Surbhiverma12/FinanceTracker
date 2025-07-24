import { createContext, useState, useContext, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(1); // INR to INR = 1

  // Fetch exchange rate when currency changes
  useEffect(() => {
    const fetchRate = async () => {
      try {
        if (currency === "USD") {
          const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
          const data = await response.json();
          setExchangeRate(data.rates.INR); // USD to INR
        } else {
          setExchangeRate(1); // If INR selected, exchange rate is 1
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
        setExchangeRate(1); // fallback
      }
    };
    fetchRate();
  }, [currency]);

  // Format and convert
  const formatCurrency = (amount) => {
    const convertedAmount = currency === "USD" ? amount / exchangeRate : amount;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
