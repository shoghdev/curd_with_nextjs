import Database from "better-sqlite3";
import { InputUser, IUser } from "./types";

const sql = new Database("crud.db")

export const getAllUsers = async (): Promise<IUser[]> => {
    return sql.prepare("SELECT * FROM users").all() as IUser[]
}

export const addNewUser = async (user: InputUser) => {
    const stm = `INSERT INTO users(name, surname, age, salary)
                 VALUES(@name, @surname, @age, @salary)`

    return sql.prepare(stm).run(user)
}

export const getUserById = async (id: number) => {
    const stm = `SELECT * FROM users WHERE ID=?`

    return sql.prepare(stm).get(id) as IUser
}

export const deleteUserById = async (id: number) => {
    const stm = `DELETE FROM users WHERE ID=?`
    return sql.prepare(stm).run(id)
}

export const updateUserById = async (user: InputUser, id:number) => {
    const stm = `UPDATE users SET name = @name, surname = @surname, age = @age, 
    salary = @salary WHERE id = @id`
    return sql.prepare(stm).run({
        name: user.name,
        surname: user.surname,
        age: user.age,
        salary: user.salary,
        id: id
    })
}