import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';



import { useMultistepForm } from '../../../hooks/useMultistepForm';
import Button from '../../ui/Button/Button';


interface MultiStepFormProps{
    steps:ReactNode[]
}

interface formValue{
    fname:string;
    lname:string;
    phone:number;
    email:string;
    password:string;
    confirm_password:string;
    proficient_language:{ language: string }[];
    focuse_language:string
}

// Define Yup schema for form validation
const schema = yup.object().shape({
    proficient_language: yup.array().of(
        yup.object().shape({
            language: yup.string().required('Proficient language is required')
        })
    ).min(1, 'At least one proficient language is required').required('proficient_language is required'),
  focuse_language: yup.string().required('Focused Language is required'),
  fname: yup.string().required('First Name is required'),
  lname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone:yup.number().required('Phone number is required'),
  password:yup.string().required('password is reqired'),
  confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('password confirmation is required'),

});

// Main MultiStepForm Component
const MultiStepForm = ({steps}: MultiStepFormProps) => {
  const methods = useForm<formValue>({
    mode:'onChange',
    resolver: yupResolver(schema), // Use Yup resolver for form validation
  });
  const { trigger}=methods

  const { currentStepIndex, step,  next, prev, isFirstStep, isLastStep } = useMultistepForm({steps});

  const onNext=async()=>{

    if(currentStepIndex==0){
        const isValid = await trigger(['proficient_language','focuse_language'])
        if(isValid) next()
    }
  }

  return (
    <FormProvider {...methods}>
      <div>
      {step}
      
      <div className='flex justify-end'>
      {!isFirstStep && <Button varient={'primary-outline'} size={'md'} onClick={prev}>Previous</Button>}
      {!isLastStep &&<Button  varient={'primary-outline'} size={'md'} onClick={onNext}>Next</Button>}
      
      </div>

      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
