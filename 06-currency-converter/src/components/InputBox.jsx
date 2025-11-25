import { useId } from "react";

function InputBox({
  label,
  className = "",
  amount,
  onAmountChange,
  isAmountDisabled = false,
  currencyOptions = [],
  selectedCurrency = "inr",
  onCurrencyChange,
  isCurrencyDisabled = false,
}) {
  const amountInputId = useId();

  return (
    // Input Box Container - increased padding, font size, and background opacity
    <div className={`bg-white/60 backdrop-blur-sm p-5 rounded-xl text-lg flex shadow-md ${className}`}>
      {/* Amount container */}
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/70 mb-3 inline-block font-medium text-lg">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-3 text-xl font-medium"
          type="number"
          placeholder="Amount"
          value={amount}
          disabled={isAmountDisabled}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
        />
      </div>

      {/* Currency container - centered dropdown arrow */}
      <div className="w-1/2 flex flex-wrap justify-end">
        <p className="text-black/70 mb-3 w-full text-right font-medium text-lg">Currency Type</p>
        <div className="relative w-full">
          <select
            className="w-full rounded-lg px-3 py-3 bg-gray-100 cursor-pointer outline-none appearance-none text-lg font-medium pr-10"
            value={selectedCurrency}
            disabled={isCurrencyDisabled}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option value={currency} key={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          {/* Custom centered dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;