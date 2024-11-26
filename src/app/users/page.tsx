"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../_helpers/types"
import Link from "next/link"

export default function Users() {
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        axios.get("http://localhost:3000/users/api")
            .then(res =>
                setUsers(res.data.payload)
            )
    }, [])

    const deleteUser = (id:number) => {
        axios.get(`http://localhost:3000/users/${id}`)
        .then(() =>
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
        )
    }

    return <>
        <div className="min-h-screen bg-gray-900 text-gray-200 p-8 sm:p-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-indigo-400">User List</h1>
                <Link
                    href="/users/add"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                >
                    Add User
                </Link>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse bg-gray-800 rounded-lg shadow-lg">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Surname</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Age</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-100">Salary</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                            >
                                <td className="px-4 py-3 text-sm">{user.id}</td>
                                <td className="px-4 py-3 text-sm">{user.name}</td>
                                <td className="px-4 py-3 text-sm">{user.surname}</td>
                                <td className="px-4 py-3 text-sm">{user.age}</td>
                                <td className="px-4 py-3 text-sm">{user.salary}</td>
                                <td className="px-4 py-3 text-sm text-center space-x-2">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                                    >
                                        Details
                                    </Link>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}