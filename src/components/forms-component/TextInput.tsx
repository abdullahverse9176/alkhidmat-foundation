import { TextInputProps } from "@/app/interfaces/forms";

export default function TextInput({
  label,
  registration,
  error,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-left mb-1">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        className="py-3 px-5 block w-full border border-gray-400 rounded focus:border-gray-400 focus:outline-none"
      />

      {error && <p className="d-block text-left text-red-500">{error.message}</p>}
    </div>
  );
}