import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  
  constructor(
    @Inject(NATS_SERVICE) private readonly productsClient: ClientProxy
  ) {}


  @Post()
  createProduct(@Body() createProductDTO: CreateProductDto){

    return  this.productsClient.send({cmd:'create_product'},createProductDTO)
  }

  @Get()
  findAllProducts( @Query() paginationDTO : PaginationDto){
    return this.productsClient.send({cmd:'find_all_product'},paginationDTO)
  }

  @Get(':id')
  async findOne(@Param('id') id : string){

return this.productsClient.send({cmd:'find_one_product'},{id})
.pipe(
  catchError(err =>{ throw new RpcException(err)} )
)

    // try {
    //   const product = await firstValueFrom(
    //   this.productsClient.send({cmd:'find_one_product'},{id})
    //   );
    //   return product
     
    // } catch (error) {

    //   throw new RpcException(error)
    // }


    
  }

  @Delete(':id')
  deleteProduct(@Param('id') id : string){
    return this.productsClient.send({cmd:'delete_product'},{id})
    .pipe(
  catchError(err =>{ throw new RpcException(err)} )
)
  }

  @Patch(':id')
  updateProduct(
    @Param('id',ParseIntPipe) id : number,
    @Body() updateProductDto: UpdateProductDto ){
    return this.productsClient.send({cmd:'update_product'},{
      id,
      ...updateProductDto})
      .pipe(
  catchError(err =>{ throw new RpcException(err)} )
)
  }
}
