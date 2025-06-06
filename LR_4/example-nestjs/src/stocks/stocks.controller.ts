import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  findAll(@Query('title') title?: string, @Query('id') id?: string): Stock[] {
    return this.stocksService.findAll(title, id ? +id : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }
}