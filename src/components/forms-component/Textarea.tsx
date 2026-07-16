import { TextInputProps } from "@/app/interfaces/forms";

export default function Textarea({
  label,
  registration,
  error,
  placeholder,
}: TextInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-left mb-1">{label}</label>

      <textarea
        {...registration}
        rows={4}
        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-neutral-dark font-semibold resize-none"
        placeholder={placeholder}
      />


      {error && <p className="d-block text-left text-red-500">{error.message}</p>}
    </div>
  );
}