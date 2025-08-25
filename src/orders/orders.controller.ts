import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, PaginatioonOrderDto, StatusDto } from './dto';

import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder',createOrderDto)
    
    //return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query()paginatioonOrderDto: PaginatioonOrderDto) {
    
    try {
      const orders = await firstValueFrom(this.ordersClient.send('findAllOrders',paginatioonOrderDto)  )
    return orders;
    } catch (error) {
      throw new RpcException(error);
    }
    
    
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    
  try {
    const order = await firstValueFrom(this.ordersClient.send('findOneOrder',{ id}));
    return order
  } catch (error) {
    throw new RpcException(error)
  }
  }


 @Get(':status')
  async findALLByStatus(
    @Param() statusDTO: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    
  try {
   
     return this.ordersClient.send('findAllOrders',
      {...paginationDto,
      status: statusDTO.status,
    }
     )
  } catch (error) {
    throw new RpcException(error)
  }
  }


  @Patch(':id')
  changeStatus(
    @Param('id',ParseUUIDPipe) id:string,
    @Body() statusDto: StatusDto,
  ){
     try {
      return this.ordersClient.send('changeOrderStatus',{id, status: statusDto.status})
     } catch (error) {
      throw new RpcException(error)
     }




  }


}
