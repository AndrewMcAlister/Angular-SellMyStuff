import { User } from '../../interfaces/user';
import { getMaxListeners } from 'process';

export class UserData {
    static users: User[] = [
        {
            id: "88B0C338-4176-4B26-8D1F-813271275B64",
            firstName: "Biggus",
            lastName: "Dickus",
            email: "biggus.dickus@gmail.com",
            phone: "0433584902",
            password: "password"
        }
    ]
}