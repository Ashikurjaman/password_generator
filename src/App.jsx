import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setChar] = useState(false);
  const [password, SetPassword] = useState("");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let word = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      word += "1234567890";
      console.log(word);
    }
    if (character) {
      word += "!@#$%&*";
      console.log(word);
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * word.length + 1);
      pass += word.charAt(char);
      // console.log(pass);
    }
    SetPassword(pass);
  }, [length, SetPassword, number, character]);

  const  copyClipBoard = useCallback(()=>{
    passwordRef.current ?.select()
    window.navigator.clipboard.writeText(password);

  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <div className="w-max max-h-max mx-auto shadow-md round-lg px-4 py-3 bg-gray-800 text-orange-700">
        <h1 className="text-white text-center my-3 text-6xl">
          Password Generator
        </h1>

        <div className="flex shadow-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3 "
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 text-xl">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-xl">Length : {length}</label>
          </div>
          <div className="">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-xl">
              Numbers
            </label>
          </div>
          <div className="">
            <input
              type="checkbox"
              defaultChecked={character}
              id="charOn"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charOn" className="text-xl">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
