import { z } from 'zod';

export interface IformValue {
    email: string;
}

export const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
});
