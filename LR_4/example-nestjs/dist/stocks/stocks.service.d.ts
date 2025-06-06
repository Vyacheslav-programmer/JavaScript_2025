import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';
export declare class StocksService {
    private fileService;
    constructor(fileService: FileService<Stock[]>);
    create(createStockDto: CreateStockDto): Stock;
    findAll(title?: string, id?: number): Stock[];
    findOne(id: number): Stock | null;
    update(id: number, updateStockDto: UpdateStockDto): Stock | null;
    remove(id: number): boolean;
}
