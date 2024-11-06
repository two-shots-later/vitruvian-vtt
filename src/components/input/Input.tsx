import { forwardRef } from "react";
import "./input.css"
import Icon from "../Icon";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  
};

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { placeholder } = props;
  
  const onBlur = (event : React.FocusEvent<HTMLInputElement>) => {
    props.onBlur && props.onBlur(event);
    const value = event.target ? (event.target as HTMLInputElement).value : "";
    if(value !== "") {
      event.target.classList.add("filled");
    } else {
      event.target.classList.remove("filled");
    }
  }
  
  return (
      <label className="field">
        <input className="p-1 text-theme-font-primary bg-theme-background-secondary border border-white rounded-md" 
          ref={ref} 
          type="text" 
          {...{...props, 
            autoCapitalize : props.autoCapitalize ? props.autoCapitalize : false, 
            autoComplete : props.autoComplete ? props.autoComplete : false,
            onBlur, 
            placeholder: undefined}
          } 
        />
      <span className="placeholder">{placeholder}</span>
      <span className="error"><Icon variant="warning"/></span>
      </label>
    );
})

export default Input;