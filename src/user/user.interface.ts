

export interface ICreateUser {
    email: string, 
    password: string, 
    username: string
}
export interface IloginUser {
    email: string, 
    password: string
}

export interface ICreateToken {
    email: string,
    username: string,
    id: string
}

export interface IUser {
    id: string,
    email: string,
    name: string,
    username: string
}

export interface ISignInUser {
    id: string,
    email: string,
    name: string,
    password: string,
    username: string
  }
