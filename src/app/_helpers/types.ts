export interface IUser {
    id:number
    name:string
    surname:string
    age:number
    salary:number
}

export type InputUser = Omit<IUser,"id">
