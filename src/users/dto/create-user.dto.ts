export class CreateUserDto {

    uid: number;
    displayedName: string;
    avatar: Uint8Array;
    login: string;
    password: string;
    email: string;
}
