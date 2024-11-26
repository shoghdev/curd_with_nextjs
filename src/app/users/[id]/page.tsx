"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { type IUser } from "@/app/_helpers/types";

export default function User() {
    const [user, setUser] = useState<IUser | null>(null);
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/users/${id}/api`)
                .then(res => {
                    setUser(res.data.user);
                })
        }

    }, [id])

    return <>
        <div className="min-h-screen bg-gray-900 py-12 px-6 flex justify-center items-center">
            <div className="bg-gray-800 w-full max-w-2xl rounded-xl shadow-lg p-8">
                
                <h1 className="text-4xl font-bold text-center text-gray-400 mb-8">User Details</h1>

                {user && (
                    <div className="space-y-6">
                        <div className="flex items-center p-4 rounded-lg gap-5 shadow-sm">
                            <span className="text-gray-600 font-semibold text-lg">Name:</span>
                            <span className="text-white text-lg">{user.name}</span>
                        </div>
                        <div className="flex items-center p-4 rounded-lg gap-5 shadow-sm">
                            <span className="text-gray-600 font-semibold text-lg">Surname:</span>
                            <span className="text-white text-lg">{user.surname}</span>
                        </div>
                        <div className="flex items-center p-4 rounded-lg gap-5 shadow-sm">
                            <span className="text-gray-600 font-semibold text-lg">Age:</span>
                            <span className="text-white text-lg">{user.age}</span>
                        </div>
                        <div className="flex items-center p-4 rounded-lg gap-5 shadow-sm">
                            <span className="text-gray-600 font-semibold text-lg">Salary:</span>
                            <span className="text-white text-lg">{user.salary}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

    </>

}
