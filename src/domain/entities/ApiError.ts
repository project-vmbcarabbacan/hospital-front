export class ApiError {
    constructor(
        public readonly message: string,
        public readonly statusCode: number,
    ) { }
}