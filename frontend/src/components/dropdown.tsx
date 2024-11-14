interface DropdownProps {
    onChange: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
    // Create an array with numbers from 1 to 50
    const numbers = Array.from({ length: 50 }, (_, i) => i + 1); // Generate an array from 1 to 50

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedValue = Number(event.target.value); // Convert string to number
        onChange(selectedValue); // Pass the selected value to the parent
    };

    return (
        <select
            className=" p-3 border-2 border-black dark:border-gray-300"
            onChange={handleSelectChange}
        >
            {numbers.map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
