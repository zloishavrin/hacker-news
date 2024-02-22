import { AxiosResponse } from "axios";
import $api from "./api";
import { Item } from "../interfaces/itemInterface";

export default class Service {

    static async getNewArticles(): Promise<AxiosResponse<number[]>> {
        return $api.get('/newstories.json');
    }

    static async getArticle(id:string): Promise<AxiosResponse<Item>> {
        return $api.get(`/item/${id}.json`);
    }

}