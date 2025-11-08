import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  // initialize state for password length and options (length, numbers, special characters)
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);

  // use reference to copy password to clipboard
  const passwordRef = useRef(null);

  // function to generate password
  const passwordGenerator = useCallback(() => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+}{[]';
    let characterPool = alphabets;
    let passwordCharacters = '';

    // check options and build character pool
    includeNumbers == true ? characterPool += numbers : null;
    includeSpecialCharacters == true ? characterPool += specialCharacters : null;

    // loop over the length of password and pick random characters from the pool
    for (let i = 1; i <= length; i++) {
      const characterIndex = Math.floor(Math.random() * characterPool.length + 1);
      passwordCharacters += characterPool.charAt(characterIndex);
    }

    // set the generated password to state
    setPassword(passwordCharacters);
  }, [length, includeNumbers, includeSpecialCharacters, setPassword]);

  // function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect to call passwordGenerator whenever options change
  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeSpecialCharacters, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto my-8 px-4 py-3 shadow-md rounded-lg bg-gray-800 text-orange-500 font-semibold'>
      {/* title */}
      <h1 className='text-center text-white my-3'>Password Generator</h1>

      {/* password box */}
      <div className='flex shadow rounded-md overflow-hidden mb-4 bg-white'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3 text-gray-800'
          placeholder='Password'
          ref={passwordRef}
          readOnly
        />
        <button
          className=' bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'
          onClick={copyToClipboard}
        >copy</button>
      </div>

      {/* options */}
      <div className='flex text-sm gap-x-6'>
        {/* length */}
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={50}
            value={length}
            id='length'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label htmlFor='length'>Length: {length}</label>
        </div>

        {/* numbers */}
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={includeNumbers}
            id='numbers'
            onChange={() => { setIncludeNumbers((prev) => !prev) }}
          />
          <label htmlFor='numbers'>Numbers</label>
        </div>

        {/* special characters */}
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={includeSpecialCharacters}
            id='special-characters'
            onChange={() => { setIncludeSpecialCharacters((prev) => !prev) }}
          />
          <label htmlFor='special-characters'>Symbol</label>
        </div>
      </div>
    </div>
  )
}

export default App;
