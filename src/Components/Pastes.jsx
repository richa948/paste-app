import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Pastes = () => {
  const pastes = useSelector((state) => state.pastes.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
        })
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Sharing failed"));
    } else {
      const url = `${window.location.origin}/paste/${paste._id}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied! Share it 🔗");
    }
  }

  return (
    <div>
      <div className="flex justify-center mt-6">
        <input
          className="w-full max-w-xl rounded-2xl border border-gray-300 
               bg-white text-gray-800 placeholder-gray-400 
               shadow-sm outline-none
               
               hover:border-gray-400
               focus:border-blue-500 focus:ring-2 focus:ring-blue-300
               
               transition duration-200"
          type="search"
          placeholder="🔍 Search your pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center ml-5 mr-5 gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-4"
            >
              <div className="text-center font-bold text-lg text-gray-800 wrap-break-word">
                {paste.title}
              </div>

              <div className="text-center text-gray-700 mt-2  wrap-break-word">
                {paste.content}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {/* ✅ EDIT */}
                <Link to={`/?pasteId=${paste._id}`}>
                  <button
                    className="px-3 py-1 text-sm rounded-lg bg-yellow-100 text-yellow-700 
                     hover:bg-yellow-500 hover:text-white 
                      transition duration-200 active:scale-95 cursor-pointer"
                  >
                    Edit
                  </button>
                </Link>

                {/* ✅ VIEW */}
                <Link to={`/pastes/${paste._id}`}>
                  <button
                    className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 
           hover:bg-blue-500 hover:text-white 
           transition duration-200 active:scale-95 cursor-pointer"
                  >
                    View
                  </button>
                </Link>

                {/* DELETE */}
                <button
                  className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 
           hover:bg-red-500 hover:text-white 
           transition duration-200 active:scale-95 cursor-pointer"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>

                {/* COPY */}
                <button
                  className="px-3 py-1 text-sm rounded-lg bg-green-100 text-green-700 
           hover:bg-green-500 hover:text-white 
           transition duration-200 active:scale-95 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>

                {/* SHARE */}
                <button
                  className="px-3 py-1 text-sm rounded-lg bg-purple-100 text-purple-700 
           hover:bg-purple-500 hover:text-white 
           transition duration-200 active:scale-95 cursor-pointer"
                  onClick={() => handleShare(paste)}
                >
                  Share
                </button>
              </div>

              <div className="flex justify-center mt-2 text-sm text-gray-500">
                {paste.createdAt}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pastes;
