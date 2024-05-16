import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Input } from "../../ui/Input/Input"

interface ILanguageRateCalculatorProps{
  learnersCount :number,
  helpersCount:number,
  basePriceValue:number
}

function LanguageRateCalculator({basePriceValue,helpersCount,learnersCount}:ILanguageRateCalculatorProps) {
console.log(basePriceValue);

  const calculateRate =useCallback((basePrice:number)=>{
    const learners = learnersCount;
    const helpers = helpersCount>0?helpersCount:1
    
    const rate = Math.floor((learners/helpers)*basePrice)
    return rate;
  },[helpersCount, learnersCount])

    const [basePrice, setBasePrice] = useState(0);
    const [rate, setRate] = useState(0)

    

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setBasePrice(Number(e.target.value));
      const rate =calculateRate(Number(e.target.value))
      setRate(rate)
    }
    useEffect(()=>{
      setRate(calculateRate(basePriceValue))
      setBasePrice(basePriceValue)
    },[ basePriceValue, calculateRate])
  return (
    <div className="flex flex-col sm:flex-row  items-center gap-2">
          
          <span>Rate per hour = </span>
          <div className="flex flex-col  ">
            <span>No.of Learner</span>
            <span className="border-b-2 border-gray-700"></span>
            <span>No.of Helpers</span>
          </div>
          <span>x basePrice</span>
          <span>=</span>

          <div className="flex flex-col  ">
            <span>{learnersCount}</span>
            <span className="border-b-2 border-gray-700"></span>
            <span>{helpersCount}</span>
          </div>

          <div className="flex items-center gap-1">
                <span>x</span>
                <Input value={basePrice} onChange={handleChange} className="w-24" type="number" />
          </div>
          
          
          <span>= {rate} rs</span>
          
        </div>
  )
}

export default LanguageRateCalculator
