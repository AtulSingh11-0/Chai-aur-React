import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(''); // Amount entered by user
  const [convertedAmount, setConvertedAmount] = useState(''); // Converted amount
  const [fromCurrency, setFromCurrency] = useState("inr"); // Currency to convert from
  const [toCurrency, setToCurrency] = useState("usd"); // Currency to convert to

  const currencyInfo = useCurrencyInfo(fromCurrency); // Fetch currency data
  const currencyOptions = Object.keys(currencyInfo); // Available currency options

  // Handler for amount input change
  const handleAmountChange = (value) => {
    if (value === '' || !isNaN(value)) {
      setAmount(value);
    }
  };

  // Handler for from currency change
  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
    if (amount !== '' && !isNaN(amount)) {
      convert();
    }
  };

  // Handler for to currency change
  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
    if (amount !== '' && !isNaN(amount)) {
      convert();
    }
  };

  // Handler for converted amount change (though input is disabled)
  const handleConvertedAmountChange = (value) => {
    setConvertedAmount(value);
  };

  // Handler for swap button click
  const handleSwapCurrencies = () => {
    // Swap currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    // Swap amounts
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // Function to perform conversion
  const convert = () => {
    if (amount !== '') {
      const amountNum = parseFloat(amount);
      if (!isNaN(amount)) {
        const result = amountNum * currencyInfo[toCurrency];
        setConvertedAmount(result.toFixed(4));
      }
    } else {
      setConvertedAmount('');
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="w-full px-4 relative z-10">
        <div className="w-full max-w-2xl mx-auto border border-white/50 rounded-3xl p-8 backdrop-blur-md bg-white/0 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-3">Currency Converter</h1>
            {/* <p className="text-white/80 text-lg">Convert between currencies with real-time exchange rates</p> */}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-6">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={handleAmountChange}
                currencyOptions={currencyOptions}
                onCurrencyChange={handleFromCurrencyChange}
                selectedCurrency={fromCurrency}
              />
            </div>

            <div className="relative w-full h-0.5 bg-white/30 my-8">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Swap currencies"
                onClick={handleSwapCurrencies}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="w-full mb-8">
              <InputBox
                label="To"
                amount={convertedAmount}
                onAmountChange={handleConvertedAmountChange}
                currencyOptions={currencyOptions}
                onCurrencyChange={handleToCurrencyChange}
                selectedCurrency={toCurrency}
                isAmountDisabled={true}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>

          {/* Footer info */}
          {/* <div className="mt-8 text-center text-white/70 text-sm">
            <p>Exchange rates are updated hourly</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;