import { StringUtil } from "../utils/string.util";

export class QuerySearchFactory {
    static getOneQueryType(params: object): string {
        let searchBy: string = 'all';

        for (const key of Object.entries(params).keys()) {
            const value = params[key]
            if (value) searchBy = 'by' + StringUtil.captalize(String(key))
        }
        return searchBy
    }
}