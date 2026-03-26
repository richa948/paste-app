import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content); // ✅ 
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 border border-gray-600 w-full max-w-xl pl-3 outline-none 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-6 py-2 mt-2 rounded-xl bg-gray-500 text-white font-semibold shadow-md hover:bg-green-600 active:scale-95 transition duration-200 cursor-pointer"
        >
          {pasteId ? "Update my paste" : "Create my Paste"}
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <textarea
          className="w-full max-w-2xl mx-auto block min-h-50 p-4 rounded-2xl border border-gray-300 
                 bg-white text-gray-900 placeholder-gray-400 
                  shadow-sm outline-none resize-none
  
                 hover:border-gray-400
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-300
  
  transition duration-200"
          value={value}
          placeholder="Enter your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
