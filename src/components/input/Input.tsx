import { forwardRef, useState } from "react";
import "./input.css"
import Icon from "../Icon";
import { UnitSize, parseUnitSize } from "../../common/types";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  width?: UnitSize;
  onValueChange? : (value : string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { placeholder, width = "full", value, onValueChange = () => {} } = props;
  
  const onBlur = (event : React.FocusEvent<HTMLInputElement>) => {
    props.onBlur && props.onBlur(event);
    const value = event.target ? (event.target as HTMLInputElement).value : "";
    if(value !== "") {
      event.target.classList.add("filled");
    } else {
      event.target.classList.remove("filled");
    }
  }
  
  const onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(event.target.value);
    props.onChange && props.onChange(event);
  }
  
  const widthStyle = width ? {width : parseUnitSize(width)} : {};
  
  return (
      <label className="field mt-2" style={widthStyle}>
        <input
          autoCapitalize="false"
          autoComplete="false"
          type="text"
          ref={ref} 
          {...props}
          value={value}
          className={`${(value !== undefined && value !== "") ? "filled " : ""}text-theme-font-primary bg-theme-background-secondary border border-white rounded-md`} 
          style={widthStyle}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={undefined}
        />
        <span className="placeholder hover:cursor-text">{placeholder}</span>
        <span className="error"><Icon variant="warning"/></span>
      </label>
    );
})

export default Input;

export function useInput(props : InputProps) : [string, React.Dispatch<React.SetStateAction<string>>, React.ReactNode] {
  
  const value : string = props.value ? Array.isArray(props.value) ? props.value[0] : props.value : "";
  const [input, setInput] = useState<string>(value);
  const component = <Input {...props} value={input} onValueChange={(value) => setInput(value)}/>;
  
  return [input, setInput, component]
}