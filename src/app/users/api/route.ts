import { addNewUser, getAllUsers } from "@/app/_helpers/model";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async () => {

    const users = await getAllUsers()

    if(!users) {
        return Response.json({payload:null, message:"Failed to fetch users"})
    }

    return Response.json({payload:users})
}

export const POST = async (req:NextRequest, res:Response) => {
    const form = await req.formData()

    const name = form.get("name") as string
    const surname = form.get("surname") as string
    const age = +(form.get("age") as string)
    const salary = +(form.get("salary") as string)

    await addNewUser({
        name, surname, age, salary
    })

    return res.json()

   
}