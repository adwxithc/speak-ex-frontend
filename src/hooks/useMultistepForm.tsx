import { ReactNode, useState } from "react"

interface useMultistepForm{
  steps:ReactNode[];
}

export function useMultistepForm({steps}:useMultistepForm) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next () {
    setCurrentStepIndex( i => {
      if (i < steps.length) return i+1

      return i 
    })
  }

  function prev() {
    setCurrentStepIndex(i => {
      if (i > 0) return i-1
      return i
    })
  }

  function goTo(index: number) {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    prev,
  }
}