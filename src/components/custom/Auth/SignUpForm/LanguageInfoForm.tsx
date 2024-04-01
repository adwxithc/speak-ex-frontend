import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {DevTool} from '@hookform/devtools'
import {  useFormContext,Controller } from 'react-hook-form';
function LanguageInfoForm() {
    const { register, control, handleSubmit,watch, formState: { errors } } = useFormContext();
const options=[ 'english','malayalam', 'hindi','arabic']
   const formD=watch()
console.log(JSON.stringify(formD),'see all',errors)
    return (
        <div className="w-full p-5  ">
            <h2 className='text-2xl font-semibold mb-8'>Set  Language Options</h2>
            
 
                <div className='py-2'>

                <Controller
                control={control}
                name="proficient_language" // Replace with your field name
                render={({ field:{onChange, value} }) => (
                <Autocomplete
                    multiple
                    defaultValue={watch('proficient_language')}
                    options={[{language:'op'},{language:'op2'}]}
                    getOptionLabel={(option) => option.language}
                    onChange={(_,data)=>{
                        onChange(data)
                    }}
                    
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Proficient Language"
                        placeholder="Language"

                        variant="outlined"
                        error={!!errors.proficient_language}
                        helperText={errors.proficient_language ? errors.proficient_language.message?.toString() : ''}
                    />
                    )}
                />
                )}
                />
                </div>

                <div className='py-2'>

                <Controller
                control={control}
                name="focuse_language" // Replace with your field name
                render={({ field:{onChange, value} }) => (
                <Autocomplete
                    defaultValue={watch('focuse_language')}
                    options={options}
                    getOptionLabel={(option) => option}
                    onChange={(_,data)=>{
                        onChange(data)

                    }}
                    
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label=" Focuse Language"
                        variant="outlined"
                        error={!!errors.focuse_language}
                        helperText={errors.focuse_language ? errors.focuse_language.message?.toString() : ''}
                        
                    />
                    )}
                />
                )}
                />
                </div>
                <DevTool control={control} />
        </div>
    )
}

export default LanguageInfoForm
