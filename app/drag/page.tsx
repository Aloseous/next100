"use client";

import { useEffect, useRef, useState } from "react";

const Page = () => {
    const [items, setItems] = useState(["Apple", "Orange", "Grapes"]);

    const dragItem = useRef<number | null>(null);
    const dragOver = useRef<number | null>(null);

    const handleSort = () => {
        if (dragItem.current !== null && dragOver.current !== null) {
            const _items = [...items];
            const draggedItem = _items.splice(dragItem.current, 1)[0];
            _items.splice(dragOver.current, 0, draggedItem);
            setItems(_items);
        }
        dragItem.current = null;
        dragOver.current = null;
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-slate-400">
            <div className="w-[500px] h-[500px] bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center justify-between">
                <div className="flex items-center justify-center w-full bg-gray-100 p-3 rounded-lg mb-6">
                    <label className="text-xl font-semibold text-gray-700">Add Item:</label>
                    <input
                        placeholder="Add an item..."
                        className="ml-4 p-2 w-[60%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="w-[300px] h-[80px] bg-teal-500 text-white rounded-2xl shadow-md flex items-center justify-center text-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                            draggable
                            onDragStart={() => (dragItem.current = index)}
                            onDragEnter={() => (dragOver.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => {
                                e.preventDefault();  // Ensures the drop target is valid
                            }}
                            onDragLeave={() => (dragOver.current = null)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
