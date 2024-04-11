import {z} from 'zod'

export interface IformValue {
    email: string;
    password: string;
}

export const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(4, 'password must be min 4 character long').max(20, 'password must be maximum 20 character long')
        .refine((s) => /[a-zA-Z]/.test(s), {
            message: "Password must contain letters.",
        })
        .refine((s) => /\d/.test(s), {
            message: "Password must contain numbers.",
        })
        .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
            message: "Password must contain special characters.",
        }),

});