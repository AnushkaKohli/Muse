import { ChangeEvent } from "react";

interface LabelledInputProps {
    label: string;
    placeholder: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({
    label,
    placeholder,
    type,
    onChange,
}: LabelledInputProps) => {
    return (
        <div>
            <div>
                <label
                    htmlFor={label}
                    className="block mb-2 text-sm font-bold text-black">
                    {label}
                </label>
                <input
                    type={type}
                    onChange={onChange}
                    id={label}
                    className="bg-gray-50 border pt-2 border-gray-300 text-gray-900 text-sm rounded-lg pr-48   focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
                    placeholder={placeholder}
                    required
                />
            </div>
        </div>
    )
}

export default LabelInput
