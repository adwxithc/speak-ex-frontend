import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import {z} from 'zod';

import { useAddLanguageMutation } from '../../../../redux/features/admin/languages/languagesApiSlice';
import toast from 'react-hot-toast';
import { Ierror } from '../../../../types/error';




interface formValue{
    name:string,
    basePrice:number
}

const schema = z.object({
    name: z.string().min(3,'language name must be minimum 3 character long'),
    basePrice: z.number().min(0, 'base price should be a positive number')
})
  


function AddNewLanguage() {

    const [addLanguage] = useAddLanguageMutation()

    const onSubmit = async(data: formValue)=>{

        try {
            const res= await addLanguage(data).unwrap()
            console.log(res);
            
            reset()
            toast.success('new language created',{
                position:'top-center'
            })
            
            
        } catch (error) {
            console.log(error);
            let message=''
            if(error.status>=400){
                const err= error as Ierror
                message=err.data.errors.map(item=>item.message) 

            }else{
                message=error.message
            }
            toast.error(message,{
                position:'top-center'
            })
            
        }
        
    }

    const methods = useForm<formValue>({
        mode:'onChange',
        resolver: zodResolver(schema), // zod resolver for form validation
      });

      const {register, handleSubmit,formState, reset}=methods;
      const {errors} = formState
  return (
    <div className=''>
      
         <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h4' component={'h1'} sx={{textAlign:'center', marginBottom:5, marginTop:3}} >Add new Language</Typography>
               <Box sx={{maxWidth:800, marginX:'auto'}} >
                    <TextField
                    

                        className=" w-full my-3"
                        label="Name"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message?.toString() : ''}
                        
                    />
                    <TextField
                   
                    type='number'
                        className=" w-full my-3"
                        label="Base Price"
                        {...register('basePrice',{ valueAsNumber: true })}
                        error={!!errors.basePrice}
                        helperText={errors.basePrice ? errors.basePrice.message?.toString() : ''}
                       
                    />
               
               <Box sx={{display:'flex',justifyContent:'end', marginTop:5}}>
                <Button variant='contained' type='submit' >Submit</Button>
                </Box>
               </Box>

                
                
                
            </form>
    </div>
  )
}

export default AddNewLanguage
