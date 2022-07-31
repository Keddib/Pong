import { Controller, Request, Get, Req, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../../dtos/user.dto';
import { isAuthGuard } from 'src/auth/guards/session.guard';
import {Repository} from "typeorm"
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
interface newFriendRequestDto{
    to: string; // uid
    from: string; 
}
interface acceptFriendRequestDto{
    accepter: string; // uid
    requester: string; 
}

@Controller('friend')
export class FriendController {
  constructor(private readonly userService: UserService,@InjectRepository(User)
  private readonly userRepo: Repository<User>) {}


  @Post('send')
    // @UseGuards(isAuthGuard)
  async sendFriendRequest(@Req() req ,@Res() res , @Body() body: newFriendRequestDto) {
    console.log("hmm", body)
    const from = body.from;
    if(!body.to || !body.from) return new Error("Bad Request")
    let friend = await this.userService.findOne(body.to);
    let user = await this.userService.findOne(from);
    console.log(user, friend)
    if (friend.friendList.map(e=>e.uid).includes(user.uid)){
      return res.status(500).send("Already friends");
    }
    if (user.friendList.map(e=>e.uid).includes(friend.uid)){
      return res.status(500).send("Already friends");
    }
    if (friend.friendRequests.map(e=>e.uid).includes(user.uid)){
      return res.status(500).send("Request pending");
    }
    friend.friendRequests.push(user)
    await this.userRepo.save(friend);
    return "Friend request sent"
  }

  @Post('accept')
  // @UseGuards(isAuthGuard)
  async acceptFriendRequest(@Req() req , @Body() body: acceptFriendRequestDto) {
    const accepter = body.accepter; // should be req.user later
    if(!body.accepter || !body.requester) return new Error("Bad Request")

    let requester = await this.userService.findOne(body.requester);
    let user = await this.userService.findOne(accepter);

    if (!user.friendRequests.map(e=>e.uid).includes(requester.uid)){
        return "User didnt send a friend request";
    }
    if (user.friendList.map(e=>e.uid).includes(requester.uid)){
        return "Already friends";
    }
    if (requester.friendList.map(e=>e.uid).includes(user.uid)){
      return "Already friends";
    }
    user.friendRequests = user.friendRequests.filter(e=>e.uid!=requester.uid)
    user.friendList.push(requester);
    requester.friendList.push(user);
    await this.userRepo.save(requester);
    await this.userRepo.save(user);
    return "Friend request accepted"
  }

  @Post('remove')
  // @UseGuards(isAuthGuard)
  async removeFriendRequest(@Req() req , @Body() body: acceptFriendRequestDto) {
    const accepter = body.accepter; // should be req.user later
    if(!body.accepter || !body.requester) return new Error("Bad Request")

    let requester = await this.userService.findOne(body.requester);
    let user = await this.userService.findOne(accepter);

    if (!user.friendRequests.map(e=>e.uid).includes(requester.uid)){
        return "User didnt send a friend request";
    }
    if (user.friendList.map(e=>e.uid).includes(requester.uid)){
        return "Already friends";
    }
    if (requester.friendList.map(e=>e.uid).includes(user.uid)){
      return "Already friends";
    }
    user.friendRequests = user.friendRequests.filter(e=>e.uid!=requester.uid)
    user.friendList.push(requester);
    requester.friendList.push(user);
    await this.userRepo.save(requester);
    await this.userRepo.save(user);
    return "Friend request accepted"
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  // @UseGuards(isAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}