import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports:[
    NatsModule
  ]
  // imports: [
  //   ClientsModule.register([
  //     { 
  //       name: NATS_SERVICE, 
  //       transport: Transport.NATS ,
  //       options:{
  //         servers: envs.natsServers
  //       }
  //     },
    
  //   ]),
  // ],
})
export class ProductsModule {}
