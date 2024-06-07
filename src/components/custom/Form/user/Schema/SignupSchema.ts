import {z} from 'zod';
import { useCheckUserNameAvailabilityMutation } from '../../../../../redux/features/user/user/userApiSlice';
import { debounce } from 'lodash';

export interface IformValue{
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    confirm_password:string;
}

export function SignupSchema() {

    const [userNameAvailable] = useCheckUserNameAvailabilityMutation()
    
    const debouncedCheckUserNameAvailability = debounce(async (username, callback) => {
        const res = await userNameAvailable(username).unwrap();
        callback(res.data.available);
    }, 500);

    

     const schema = z.object({
        firstName: z.string().min(3,'first name must be minimum 3 character long'),
        lastName: z.string(),
        userName: z.string().min(3,'userName must be minimum 3 character long')
        .refine(async (username) => {
            if(username.length<3) return true
          
            return new Promise(resolve => {
                debouncedCheckUserNameAvailability(username, resolve);
            });
          }, { message: 'Username is already taken' }),
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

    return schema
}

export default SignupSchema





