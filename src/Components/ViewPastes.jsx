import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.pastes.pastes);

  console.log("ID:", id);
  console.log("Pastes:", pastes);

  const paste = pastes.find((p) => p._id === id);

  console.log("Found paste:", paste);

  if (!paste) {
    return (
      <div className="text-center mt-10 text-red-500">Paste not found</div>
    );
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">{paste.title}</h1>
      <p className="mt-4">{paste.content}</p>
    </div>
  );
};

export default ViewPaste;
