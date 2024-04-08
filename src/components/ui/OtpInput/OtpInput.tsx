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
        "flex justify-center items-center space-x-3",
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
                  "w-8 h-8 md:w-12 md:h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
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
