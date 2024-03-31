import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import { useMultistepForm } from '../../../hooks/useMultistepForm';


interface MultiStepFormProps{
    steps:ReactNode[]
}

// Define Yup schema for form validation
const schema = yup.object().shape({
  knownLanguage: yup.string().required('Known Language is required'),
  focusedLanguage: yup.string().required('Focused Language is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

// Main MultiStepForm Component
const MultiStepForm = ({steps}: MultiStepFormProps) => {
  const methods = useForm({
    resolver: yupResolver(schema), // Use Yup resolver for form validation
  });

  const { step, goTo, next, prev, isFirstStep, isLastStep } = useMultistepForm(steps);

  return (
    <FormProvider {...methods}>
      <div>
      {step}
      
      {!isFirstStep && <button onClick={prev}>Previous</button>}
      {!isLastStep && <button onClick={next}>Next</button>}
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
