import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface BaseFieldProps {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export interface TextInputProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "tel" | "number";
  placeholder?: string;
}

export interface TextAreaProps extends BaseFieldProps {
  rows?: number;
  placeholder?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectInputProps extends BaseFieldProps {
  options: SelectOption[];
}