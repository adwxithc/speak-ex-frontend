import { Ierror } from "../types/error";

export function isHttpError(error: unknown): error is Ierror {
    return typeof error === 'object' && error !== null && 'status' in error && typeof error.status === 'number' && error.status>=400 && error.status<600;
}