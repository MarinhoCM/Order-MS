import { HttpStatus } from "@nestjs/common";

export class ResponseMapper {
    public static toResult(
        resultData: any | any[], status: HttpStatus, message?: string
    ) {
        return {
            data: resultData,
            total: resultData.length,
            status,
            message
        }
    }
}