import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { ArticleFeature } from 'entities/Article-Feature.entity';
import { ArticlePrice } from 'entities/Article-Price.entity';
import { Article } from 'entities/Article.entitiy';
import { CartArticle } from 'entities/Cart.Article.entity';
import { Cart } from 'entities/Cart.entitiy';
import { Category } from 'entities/Category.entity';
import { Feature } from 'entities/Feature.entity';
import { Order } from 'entities/Order.entitiy';
import { Photo } from 'entities/Photo.entity';
import { User } from 'entities/User.entitiy';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';



@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: "mysql",
        host: DatabaseConfiguration.hostname,
        port: 3306,
        username: DatabaseConfiguration.username,
        password: DatabaseConfiguration.password,
        database: DatabaseConfiguration.database,
        entities: [ 
          Administrator,
          ArticleFeature,
          ArticlePrice,
          Article,
          CartArticle,
          Cart,
          Category,
          Feature,
          Order,
          Photo,
          User,

         ]

      }),
      TypeOrmModule.forFeature([ Administrator ])

  ],
  controllers: [
    AppController,
    AdministratorController,
  ],
  providers: [ AdministratorService],

})
export class AppModule {}


