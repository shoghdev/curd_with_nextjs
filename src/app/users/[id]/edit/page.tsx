'use client'

import { type IUser } from "@/app/_helpers/types"
import axios from "axios"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditUser() {
    const [user, setUser] = useState<IUser | null>(null)
    const { id } = useParams()
    
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/users/${id}/api`)
                .then(res => {
                    setUser(res.data.user);
                })
        }

    }, [id])


    const handelUpdate = (data: FormData) => {
        const userData = {
            name: data.get("name"),
            surname: data.get("surname"),
            age: data.get("age"),
            salary: data.get("salary")
        }

        console.log(userData)
        if (id) {
            axios.put(`http://localhost:3000/users/${id}/api`, userData)
                .then(res => {
                    setUser(res.data.user )
                })
                .catch(err => {
                    console.log("Error:", err);
                console.log("Response error:", err.response?.data);
                })
        }
    }

    return <>
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">Edit User</h1>
                {user &&
                    <form className="space-y-6" action={handelUpdate}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Edit First Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={user.name}
                                placeholder="First Name"
                                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="surname"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Edit Last Name
                            </label>
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                defaultValue={user.surname}
                                placeholder="Last Name"
                                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Edit  Age
                            </label>
                            <input
                                type="text"
                                name="age"
                                id="age"
                                defaultValue={user.age}
                                placeholder="Age"
                                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="salary"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Edit Salary
                            </label>
                            <input
                                type="text"
                                name="salary"
                                id="salary"
                                defaultValue={user.salary}
                                placeholder="Salary"
                                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white font-medium rounded-md px-4 py-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    </>
}