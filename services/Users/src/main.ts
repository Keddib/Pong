import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from "passport"
import * as session from "express-session"
import { DataSource, DataSourceOptions, } from 'typeorm';
import { TypeOrmSession } from './auth/utils/Session.entity';
import { TypeormStore } from 'connect-typeorm/out';
import { TypeOrmConfigService } from './typeorm/typeorm.service';

async function getSessionRepo(){
  const dataSourceOpts = (new TypeOrmConfigService()).createTypeOrmOptions() as DataSourceOptions; 
  const dataSource = await new DataSource(dataSourceOpts).initialize()
  const sessionRepo = dataSource.getRepository(TypeOrmSession)
  return sessionRepo;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepo = await getSessionRepo();

  //console.log(sessionRepo)
  app.use(session({
    cookie : { maxAge: 86400000 },
    secret : "helloworld",
    resave : false,
    saveUninitialized : false,
    store: new TypeormStore().connect(sessionRepo)
  }))
  app.enableCors({origin:["http://localhost:8000"], credentials:true})
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000);
}
bootstrap();