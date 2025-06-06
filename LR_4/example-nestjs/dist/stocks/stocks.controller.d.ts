import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    findAll(title?: string, id?: string): Stock[];
    findOne(id: string): Stock | null;
    create(createStockDto: CreateStockDto): Stock;
    update(id: string, updateStockDto: UpdateStockDto): Stock | null;
    remove(id: string): boolean;
}
