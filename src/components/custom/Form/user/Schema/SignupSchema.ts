import {z} from 'zod';


export const schema = z.object({
    firstName: z.string().min(3,'first name must be minimum 3 character long'),
    lastName: z.string(),
    userName: z.string().min(3,'userName must be minimum 3 character long'),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(4,'password must be min 4 character long').max(20,'password must be maximum 20 character long')
    .refine((s) => /[a-zA-Z]/.test(s), {
        message: "Password must contain letters.",
    })
    .refine((s) => /\d/.test(s), {
        message: "Password must contain numbers.",
    })
    .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
        message: "Password must contain special characters.",
    }),
    confirm_password: z.string()

  })
  .refine((schema)=>{
        return schema.password==schema.confirm_password
  },{
    message: "Passwords must match",
    path: ['confirm_password']
});

export interface IformValue{
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    confirm_password:string;
}