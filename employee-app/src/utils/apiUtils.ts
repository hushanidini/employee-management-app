
export function buildApiUrl(version: string, endpoint: string): string {
    return `/${version}/${endpoint}`;
}


export class InvalidInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

export class ApiRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiRequestError';
    }
}