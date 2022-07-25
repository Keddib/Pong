import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User, UserCreateDto} from "../users/entities/user.entity"
import {Repository} from "typeorm"

export interface AuthenticationProvider {
    validateUser(userCreateDto : UserCreateDto);
    createUser(userCreateDto : UserCreateDto);
    findUser(ftId:string) : Promise<User | undefined>;
}

@Injectable()
export class AuthService implements AuthenticationProvider {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){
    
    }
    async validateUser(userCreateDto : UserCreateDto){
        const { ftId } = userCreateDto;
        const user = await this.userRepository.findOne( {where:{ftId}} );
        //console.log(user)
        if (user) return user;
        return this.createUser(userCreateDto);
    }
    
    createUser(userCreateDto : UserCreateDto){
        //console.log("creating user ");
        const user = this.userRepository.create(userCreateDto);
        return this.userRepository.save(user);
    }

    findUser(ftId : string) : Promise<User | undefined> {
        return this.userRepository.findOne( {where:{ftId}} );
    }
}
