import { z } from 'zod';

export interface IformValue {
    password: string;
    confirm_password: string;
}

export const schema = z
    .object({
        password: z
            .string()
            .min(4, 'password must be min 4 character long')
            .max(20, 'password must be maximum 20 character long')
            .refine((s) => /[a-zA-Z]/.test(s), {
                message: 'Password must contain letters.',
            })
            .refine((s) => /\d/.test(s), {
                message: 'Password must contain numbers.',
            })
            .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
                message: 'Password must contain special characters.',
            }),
        confirm_password: z.string(),
    })
    .refine(
        (schema) => {
            return schema.password == schema.confirm_password;
        },
        {
            message: 'Passwords must match',
            path: ['confirm_password'],
        }
    );
