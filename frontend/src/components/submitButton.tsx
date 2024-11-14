import React from "react";

interface SubmitButtonProps {
    // headers: string[];
    // values: string[];
    selectedRow: any;
    onSubmit: (data: string) => void; // Callback to handle the JSON data
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    selectedRow,
    onSubmit,
}) => {
    const handleClick = () => {
        // Convert headers and values into an object
        // const obj = convertToObj(selectedRow);

        // Convert the object to JSON
        const jsonData = JSON.stringify(selectedRow);

        // Call the provided onSubmit function with the JSON data
        // console.log(jsonData)
        onSubmit(jsonData);
    };

    return (
        <button className="bg-green-500" onClick={handleClick}>
            Submit
        </button>
    );
};
// const SubmitButton: React.FC<SubmitButtonProps> = ({
//     headers,
//     values,
//     onSubmit,
// }) => {
//     const handleClick = () => {
//         // Convert headers and values into an object
//         const obj = convertToObj(headers, values);

//         // Convert the object to JSON
//         const jsonData = JSON.stringify(obj);

//         // Call the provided onSubmit function with the JSON data
//         onSubmit(jsonData);
//     };

//     return (
//         <button className="bg-green-500" onClick={handleClick}>
//             Submit
//         </button>
//     );
// };

export default SubmitButton;
