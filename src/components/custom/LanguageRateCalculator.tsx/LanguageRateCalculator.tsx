import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { Input } from "../../ui/Input/Input"

interface ILanguageRateCalculatorProps {
  learnersCount: number,
  helpersCount: number,
  basePrice: number,
  setBasePrice: Dispatch<SetStateAction<number>>,
  rate: number,
  setRate: Dispatch<SetStateAction<number>>
}

function LanguageRateCalculator({ helpersCount, learnersCount, basePrice, rate, setBasePrice, setRate }: ILanguageRateCalculatorProps) {


  const calculateRate = useCallback((basePrice: number) => {
    const learners = learnersCount;
    const helpers = helpersCount > 0 ? helpersCount : 1

    const rate = Math.floor((learners / helpers) * basePrice)
    return rate;
  }, [helpersCount, learnersCount])



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBasePrice(Number(e.target.value));
    const rate = calculateRate(Number(e.target.value))
    setRate(rate)
  }

  useEffect(() => {
    setRate(calculateRate(basePrice))

  }, [basePrice, calculateRate, setRate])
  return (
    <div className="flex flex-col md:flex-row  items-center gap-2 font-semibold">

      <span className="mr-5 ">Rate per hour = </span>
      <div className="flex flex-col mr-5 ">
        <span >No.of Learner</span>
        <span className="border-b-2 border-gray-700"></span>
        <span  >No.of Helpers</span>
      </div>
      <span >x basePrice</span>
      <span>=</span>

      <div className="flex flex-col  mr-5">
        <span>{learnersCount}</span>
        <span className="border-b-2 border-gray-700"></span>
        <span>{helpersCount}</span>
      </div>

      <div className="flex items-center gap-1 mr-5">
        <span className="mr-2">x</span>
        <Input value={basePrice} onChange={handleChange} className="w-24" type="number" />
      </div>


      <span className="font-semibold"> = {rate} rs</span>

    </div>
  )
}

export default LanguageRateCalculator
