"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface User {
    name: string;
    age: number;
    sex: string;
    desc: string;
    avatar: string;
}

const Slider = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<number>(0);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch('/api/slider');
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-[#4B4242] min-h-screen flex items-center justify-center">
            <div className="w-[600px] h-[100px] flex items-center bg-[#BD9191] gap-4 relative p-4 rounded-lg">
                {users[currentUser] && (
                    <>
                        <div className="flex basis-2/12 items-center">
                            <Image
                                className="w-16 h-16 rounded-xl object-cover"
                                src={users[currentUser].avatar}
                                width={100}
                                height={100}
                                alt="User Avatar"
                            />
                        </div>
                        <div className="flex flex-col basis-4/12">
                            <span>Name: {users[currentUser].name}</span>
                            <span>Age: {users[currentUser].age}</span>
                            <span>Sex: {users[currentUser].sex}</span>
                        </div>
                        <div className="basis-6/12 bg-slate-200 flex items-center justify-center text-center rounded-md text-sm p-2">
                            {users[currentUser].desc}
                        </div>

                        <button
                            className={`absolute left-[-2rem] w-10 h-10 bg-white rounded-md hover:bg-black hover:text-white ${currentUser === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => setCurrentUser((prev) => prev - 1)}
                            disabled={currentUser === 0}
                        >
                            {"<"}
                        </button>
                        <button
                            className={`absolute right-[-2rem] w-10 h-10 bg-white rounded-md hover:bg-black hover:text-white ${currentUser === users.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => setCurrentUser((prev) => prev + 1)}
                            disabled={currentUser === users.length - 1}
                        >
                            {">"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Slider;
