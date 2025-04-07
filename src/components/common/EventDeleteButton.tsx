"use client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EventDeleteButton = ({ id }: { id: string }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    await axios.delete(`/api/event-types/?id=${id}`).then(() => {
      router.push("/dashboard/event-types");
      router.refresh();
    });
  }
  return (
    <div>
      {!showConfirmation && (
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-8 rounded-full btn-red"
          onClick={() => setShowConfirmation(true)}
        >
          <Trash2 size={16} />
          Delete
        </button>
      )}
      {showConfirmation && (
        <div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="btn-gray"
          >
            Cancel
          </button>
          <button onClick={() => handleDelete()} className="btn-red">
            Yes, Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventDeleteButton;
