import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false);
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-6">
          <h1 className="text-center text-2xl font-bold text-white mb-6 tracking-tight">
            Secure Password Generator
          </h1>

          <div className="relative mb-6">
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                ref={passwordRef}
                className="flex-1 py-3 px-4 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
                placeholder="Your password will appear here"
              />
              <button
                onClick={copyPasswordToClipboard}
                className={`px-4 rounded-r-lg font-semibold transition-all duration-200 ${
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Password Length</span>
                <span className="bg-gray-700 px-2 py-0.5 rounded">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="100"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={numAllowed}
                  onChange={() => setNumAllowed((prev) => !prev)}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-200">Numbers (0-9)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-200">Symbols (!@#$%)</span>
              </label>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={passwordGenerator}
              className="text-sm px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
            >
              Regenerate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
