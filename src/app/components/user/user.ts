import { Guid } from 'guid-typescript';

export interface User {
    id: Guid;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password:string;
}