export class ForbiddenError extends Error {
    constructor(public message: string) {
        super(message);
    }
}