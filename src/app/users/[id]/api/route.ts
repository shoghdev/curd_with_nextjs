import { deleteUserById, getUserById, updateUserById } from "@/app/_helpers/model";
import { InputUser, IUser } from "@/app/_helpers/types";
import { NextRequest, NextResponse } from "next/server";

interface IProps {
    params: { id: number }
}

export const GET = async (req: NextRequest, { params }: IProps) => {
    await params
    let user = await getUserById(params.id)
    if (!user) {
        return Response.json({ user: null })
    }

    return Response.json({ user })

}

export const DELETE = async (req: NextRequest, { params }: IProps) => {
    await params
    deleteUserById(params.id)

    return Response.json({ status: 200 })
}

export const PUT = async (req: Request, { params }: IProps) => {
    const form: InputUser = await req.json()
    await updateUserById(form, params.id)

    return Response.json({ req, status: 200,  })
}