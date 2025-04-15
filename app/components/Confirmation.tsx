import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteChat } from "../../redux/chatSlice";
import { signOut } from "next-auth/react";

interface ConfirmProps {
  text: string;
  setWindow: React.Dispatch<React.SetStateAction<boolean>>;
  purpose: "DELETE" | "SIGNOUT";
  chatId?: string;
}

export const Confirmation: React.FC<ConfirmProps> = ({ text, setWindow, purpose, chatId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleConfirm = () => {
    if (purpose === "DELETE") {
      if (!chatId) return console.error("Chat ID is required for deletion");
      dispatch(deleteChat(chatId))

    } else if (purpose === "SIGNOUT") {
      signOut();
    }
    setWindow(false); // Close the modal after confirmation
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-screen w-screen">
      <div className="bg-chat p-6 rounded-lg shadow-lg w-80">
        <p className="text-lg font-semibold text-text text-center">
          Are you sure you want to <span className="text-red-500">{text}</span>?
        </p>
        <div className="mt-4 flex justify-center space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-chat rounded hover:bg-gray-400 transition"
            onClick={() => setWindow(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
