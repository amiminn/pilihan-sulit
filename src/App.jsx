import { useRef, useState } from "react";
import { emoji } from "./emoji.json";
import _ from "lodash";
import { Cookie } from "storage-manager-js";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [ready, setReady] = useState(false);
  const [dataList, setDataList] = useState([]);
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function addList() {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  }

  function removeList(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function simpanForm() {
    Cookie.set("dataList", todos, { useSecure: false });
    setReady(true);
    const data = Cookie.get("dataList");
    setDataList(data);
  }

  function batal() {
    setReady(false);
  }

  function getId(e) {
    let data = e.target.getAttribute("x-before");
    e.target.classList.add("hidden");
    let munculData = document.querySelectorAll(`[x-after="${data}"]`)[0];
    munculData.classList.remove("hidden");
    munculData.classList.add("flex");
  }

  function startGame() {
    return (
      <>
        <div className="grid gap-3 w-full sm:md:w-1/4 mx-5 ">
          {_.shuffle(
            dataList.map((data, index) => {
              return (
                <div key={index}>
                  <div
                    x-before={index}
                    className="bg-blue-300 rounded flex justify-center items-center h-20 text-5xl cursor-pointer animate__animated animate-fast animate__zoomIn"
                    onClick={getId}
                  >
                    {_.sample(emoji)}
                  </div>
                  <div
                    x-after={index}
                    className="bg-blue-700 rounded hidden justify-center items-center h-20 text-5xl italic animate__animated animate-fast animate__zoomIn"
                  >
                    {data}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <button
          className="absolute bottom-0 bg-rose-900 rounded-lg px-4 py-1 mb-2 text-lg italic"
          onClick={batal}
        >
          batal
        </button>
      </>
    );
  }

  function isiForm() {
    return (
      <div className="grid gap-4  ">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            className="text-black px-3 rounded animate__animated animate-fast animate__zoomIn"
            onChange={handleInputChange}
            placeholder="Tambah Opsi.."
          />
          <button
            onClick={addList}
            className="bg-sky-200 px-5 py-2 rounded-md group animate__animated animate-fast animate__zoomIn"
          >
            <div className="group-hover:rotate-180 transition">➕</div>
          </button>
        </div>
        <ul className="grid gap-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between gap-3 items-center animate__animated animate-fast animate__zoomIn "
            >
              <div className="text-lg">{todo}</div>
              <button
                className="bg-rose-200 hover:scale-125 transition rounded py-1 px-2 text-sm"
                onClick={() => removeList(index)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        {todos != "" && (
          <div className="grid items-center justify-center">
            <button
              onClick={simpanForm}
              className="text-xl px-6 py-2 bg-slate-600 rounded-lg font-semibold italic animate__animated animate-fast animate__zoomIn"
            >
              mulai
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-[#0F172A] text-white flex justify-center items-center">
        {ready ? startGame() : isiForm()}
      </div>
    </>
  );
}

export default App;
