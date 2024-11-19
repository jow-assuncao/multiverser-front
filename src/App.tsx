import { useEffect, useState } from "react";
import { generateFromInput, generateArrayFromInput } from "multiverser";
import Radio from "./components/radio";
import { EOutputTypes } from "./@types";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [arrayQty, setArrayQty] = useState(1);
  const [outputType, setOutputType] =
    useState<keyof typeof EOutputTypes>("OBJECT");

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleOutput = (value: string) => {
    if (!value) return;

    try {
      const fixedJsonString = value.replace(
        /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
        '$1"$2":'
      );

      if (outputType === EOutputTypes.ARRAY) {
        const randomData = generateArrayFromInput(
          JSON.parse(fixedJsonString),
          arrayQty
        );
        return setOutput(JSON.stringify(randomData));
      }

      setError("");
      const randomData = generateFromInput(JSON.parse(fixedJsonString));
      return setOutput(JSON.stringify(randomData));
    } catch {
      setError("Cannot generate data. Please, verify your model!");
      setOutput("");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleOutput(input), [input, outputType, arrayQty]);

  return (
    <div className="bg-black w-screen h-screen font-semibold py-10">
      <div className="max-w-[1440px] m-auto">
        <nav className="mb-10">
          <h1 className="text-white text-2xl pb-10 border-gray border-b-[1px]">
            multiverser
          </h1>
        </nav>
        <main>
          <p className="text-white font-normal mb-11">
            multiverser is a random data generator that can create simple mocks
            using functions or data models. It's very useful for debuging,
            generating random data without having to create schemas.
          </p>

          <div className="h-full flex flex-col gap-7">
            <div>
              <p className="text-white font-normal mb-4">
                paste your data model:
              </p>
              <textarea
                placeholder="{ ... }"
                className={`bg-grayDark ${
                  error ? "border-red-500" : "border-gray"
                } border-[1px] resize-none w-full outline-none p-4 placeholder-grayLight text-white min-h-[230px]`}
                value={input}
                onChange={(e) => handleInput(e.target.value)}
              ></textarea>
              {error ? (
                <span className="text-red-500 font-semibold text-sm">
                  {error}
                </span>
              ) : undefined}
            </div>

            <form className="flex gap-6 h-8">
              <Radio
                checked={outputType === EOutputTypes.OBJECT}
                onChange={(value) => {
                  if (value) setOutputType(EOutputTypes.OBJECT);
                }}
                name="type"
                label="object"
              />
              <Radio
                checked={outputType === EOutputTypes.ARRAY}
                name="type"
                onChange={(value) => {
                  if (value) setOutputType(EOutputTypes.ARRAY);
                }}
                label="array"
              />
              {outputType === EOutputTypes.ARRAY ? (
                <div className="text-white flex gap-3 items-center">
                  <span>with</span>
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setArrayQty(Number(e.target.value))}
                    value={arrayQty}
                    className="bg-grayDark border-gray border-[1px] resize-none w-14 h-8 px-2 outline-none placeholder-grayLight text-white"
                  />
                  <span>object(s)</span>
                </div>
              ) : undefined}
            </form>

            <div>
              <p className="text-white font-normal mb-4">grab your output:</p>
              <textarea
                placeholder="{ ... }"
                className="bg-grayDark border-gray border-[1px] resize-none w-full outline-none p-4 placeholder-grayLight text-white min-h-[230px]"
                readOnly
                value={output}
              ></textarea>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
