import { Injectable, UnauthorizedException, Request, Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import  axios from 'axios';
import { CreateUserDto } from 'src/dtos/user.dto';
import { ChatRoom } from 'src/entities/chatRoom.entity';

@Injectable()
export class AuthService {

    constructor( private userService: UserService) {
    
    }

    async validateUser(username: string, password: string) : Promise<User> {
    
        const user = await this.userService.findByUsername(username);

        //  check if password matchs with bcrypt
        if (!user || user.password != password) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async validateIntraUser(username: string, password: string) : Promise<User> {

        const user = await this.userService.findByUsername(username);

        //  check if password matchs with bcrypt
        if (!user || user.password != password) {
            return user;
        }
        return user;
    }

    async login(@Request() req) {

        //  create session
        return " Logged in ";
    }


    async loginWithIntra(@Query() que) {

        let code = que['code'];
        try {
            console.log(code);
            const authToken = await axios({
            
              url: "https://api.intra.42.fr/oauth/token",
              method: "POST",
              data: {
                grant_type: "authorization_code",
                client_id: "701e6934d4fe51b1cb9441ec66efe6749314ca61646406288bc4f058d5a9ec05",
                client_secret: "1a6c63ae00df1990b58af86bf2a7c89249424ca8d86691fd0b3a28b027feda02",
                code: code,
                redirect_uri: "http://localhost:3500/auth"
              }
      
            });
          
            console.log('extracting authToken'); 
            const token =  authToken.data["access_token"];
            // console.log(token);
            console.log(token);
            const userData = await axios({
              url: "https://api.intra.42.fr/v2/me",
              method: "GET",
              headers: {
                "Authorization": "Bearer " + token
              }
            })
            // const test = await this.userRepository.findOneBy({ login: userData.data.login });
            // console.log(test);
            // To check later for all user details and update
            if (await this.userService.findByUsername(userData.data.login)) {
              return "User already in Database";
            }
      
            console.log(userData.data.email);
            const user = new CreateUserDto;
      
            user.email = userData.data.email;
            user.displayedName = userData.data.login;
            user.avatar = userData.data.image_url;
            user.login = userData.data.login;
            
            this.userService.create(user);
            // const chatRoom = new ChatRoom;
            // user.chatRooms =  [chatRoom];
            user.password = 'defaultpassword';
            // this.userRepository.create(user);
            // this.userRepository.save(user);
          }
          catch (error) {
      
            return error;
          }
          return "Added New User To database check /users";
    }

    async logout() {
    

        return "logged out ";
    }
}
