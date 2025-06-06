"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let StocksService = class StocksService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createStockDto) {
        const stocks = this.fileService.read();
        const stock = { ...createStockDto, id: stocks.length + 1 };
        this.fileService.add(stock);
        return stock;
    }
    findAll(title, id) {
        let stocks = this.fileService.read();
        if (id) {
            stocks = stocks.filter((stock) => stock.id === id);
        }
        if (title) {
            stocks = stocks.filter((stock) => stock.title.toLowerCase().includes(title.toLowerCase()));
        }
        return stocks;
    }
    findOne(id) {
        const stocks = this.fileService.read();
        return stocks.find((stock) => stock.id === id) ?? null;
    }
    update(id, updateStockDto) {
        const stocks = this.fileService.read();
        const stockIndex = stocks.findIndex((stock) => stock.id === id);
        if (stockIndex === -1)
            return null;
        const updatedStock = { ...stocks[stockIndex], ...updateStockDto };
        stocks[stockIndex] = updatedStock;
        this.fileService.write(stocks);
        return updatedStock;
    }
    remove(id) {
        const stocks = this.fileService.read();
        const filteredStocks = stocks.filter((stock) => stock.id !== id);
        if (filteredStocks.length === stocks.length)
            return false;
        this.fileService.write(filteredStocks);
        return true;
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map