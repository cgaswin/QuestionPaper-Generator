class ApiResponse {
    statusCode: number;
    message: string;
    data: object;
    success: boolean;

    constructor(statusCode:number, message:string, data:object,) { 
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export {ApiResponse};