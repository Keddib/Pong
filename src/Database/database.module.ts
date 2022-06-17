import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { Game } from "src/games/entities/game.entity";

export  const AppDataSource = new DataSource( {

  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "root",
  password: "root",
  database: "test_db",
  logging: true,
  subscribers: [],
  migrations: [],
  entities: [User, Game, ChatRoom],
  synchronize: true, // to remove when finished 
  }
);