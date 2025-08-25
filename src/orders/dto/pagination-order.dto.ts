import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/orders.enum";

export class PaginatioonOrderDto extends PaginationDto{

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList}` 
  })
  @IsOptional()
  status: OrderStatus 

  
}