import React, {  useState, useRef, useEffect } from "react";
import { cn } from "../../../utils/style-utils";


export interface OtpInputProps{
    className?:string;
    onOtpChange:(otp: string[]) => void
}

let currentOTPIndex: number = 0;
const OtpInput = ({ className,onOtpChange}:OtpInputProps) => {

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const newOTP: string[] = [...otp];
      newOTP[currentOTPIndex] = value.substring(value.length - 1);
  
      if (!value) setActiveOTPIndex(currentOTPIndex - 1);
      else setActiveOTPIndex(currentOTPIndex + 1);
  
      setOtp(newOTP);
      onOtpChange(newOTP)
    };
  
    const handleOnKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      currentOTPIndex = index;
      if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
    };
  
    useEffect(() => {
      inputRef.current?.focus();
    }, [activeOTPIndex]);
  
    return (
      <div 
      className={cn(
        "flex justify-center items-center space-x-2 md:space-x-3",
        className
    )}
      >
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={activeOTPIndex === index ? inputRef : null}
                type="number"
                className={
                  "w-10 h-12 md:w-14 md:h-16 border-2 rounded-xl bg-white outline-none text-center font-bold text-xl md:text-2xl spin-button-none border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-700 transition-all duration-200 shadow-sm"
                }
                onChange={handleOnChange}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                value={otp[index]}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
}

export default OtpInput;
