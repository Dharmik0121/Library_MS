import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateBookQuantity } from "../store/slices/bookSlice";
import { toggleUpdateQuantityPopup } from "../store/slices/popUpSlice";

const UpdateQuantityPopup = () => {
    const dispatch = useDispatch();
    const { updateQuantityPopup, selectedBook } = useSelector((state) => state.popup);

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (selectedBook) {
            setQuantity(selectedBook.quantity);
        }
    }, [selectedBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBookQuantity(selectedBook._id, quantity));
        dispatch(toggleUpdateQuantityPopup(null));
    };

    if (!updateQuantityPopup || !selectedBook) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">
                    Update Quantity for &quot;{selectedBook.title}&quot;
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        className="w-full border px-3 py-2 rounded mb-4"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded"
                            onClick={() => dispatch(toggleUpdateQuantityPopup(null))}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateQuantityPopup;
