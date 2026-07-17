import { PhoneInputFieldProps } from "@/app/interfaces/forms";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function PhoneInputField({
  name,
  control,
  label,
  error,
}: PhoneInputFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-left mb-1">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            defaultCountry="pk"
            value={field.value}
            onChange={field.onChange}
            inputClassName="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold" 
            countrySelectorStyleProps={{
              buttonClassName:
                "border border-gray-300 rounded-l-lg bg-white hover:bg-gray-50",
            }}
          />
        )}
      />

      {error && <p className="d-block text-left text-red-500">{error.message}</p>}
    </div>
  );
}