import { NewsItem } from "../model/NewsItem";
import {v4 as uuidv4} from 'uuid'
import { INewsRepository } from "../repository/interface/INewsRepository";
import { newsItemRepository } from "../repository/repoExporter";

class NewsItemService{
    private niRepo
    constructor(nir: INewsRepository){
        this.niRepo = nir
    }
    async getAll(): Promise<NewsItem[]>{
        return this.niRepo.getAll()
    }
    async getById(uuid: string): Promise<NewsItem|null>{
        return this.niRepo.getById(uuid)
    }
    async create(title: string, body: string, image: string): Promise<NewsItem>{
        const uuid = uuidv4()
        const news = new NewsItem(uuid, title, body, image, String(Date.now()))
        return this.niRepo.create(news)
    }
    async update(uuid: string,title: string, body: string, image: string): Promise<NewsItem|null>{
        const news = new NewsItem(uuid, title, body, image, String(Date.now()))
        return this.niRepo.update(uuid, news)
    }
    async delete(uuid: string): Promise<void>{
        return await this.niRepo.delete(uuid)
    }
}
export const newsItemService = new NewsItemService(newsItemRepository)
