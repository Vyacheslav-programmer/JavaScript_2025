import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto): Stock {
    const stocks = this.fileService.read();
    const stock = { ...createStockDto, id: stocks.length + 1 };
    this.fileService.add(stock);
    return stock;
  }

  findAll(title?: string, id?: number): Stock[] {
    let stocks = this.fileService.read();

    if (id) {
      stocks = stocks.filter((stock) => stock.id === id);
    }

    if (title) {
      stocks = stocks.filter((stock) =>
        stock.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    return stocks;
  }

  findOne(id: number): Stock | null {
    const stocks = this.fileService.read();
    return stocks.find((stock) => stock.id === id) ?? null;
  }

  update(id: number, updateStockDto: UpdateStockDto): Stock | null {
    const stocks = this.fileService.read();
    const stockIndex = stocks.findIndex((stock) => stock.id === id);
    if (stockIndex === -1) return null;
    const updatedStock = { ...stocks[stockIndex], ...updateStockDto };
    stocks[stockIndex] = updatedStock;
    this.fileService.write(stocks);
    return updatedStock;
  }

  remove(id: number): boolean {
    const stocks = this.fileService.read();
    const filteredStocks = stocks.filter((stock) => stock.id !== id);
    if (filteredStocks.length === stocks.length) return false;
    this.fileService.write(filteredStocks);
    return true;
  }
}