import React, { useEffect, useState } from "react";
import ImageGrid from "./content";

const ShowRow: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e: any) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const getBorderColor = () => (isDarkMode ? "gray" : "black");

    return (
        <div>
            <h3>Please select an image</h3>
            <ImageGrid />
        </div>
    );
};

export default ShowRow;

// import React, { useEffect, useState } from "react";
// import sendToAPI from "../api/submit";
// import { data as importedData } from "../data/output"; // Import data
// import Dropdown from "./dropdown";
// import SubmitButton from "./submitButton";

// const headers = importedData[0];
// const ShowRow: React.FC = () => {
//     const [isDarkMode, setIsDarkMode] = useState(
//         window.matchMedia("(prefers-color-scheme: dark)").matches
//     );

//     useEffect(() => {
//         const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//         // Set initial value
//         setIsDarkMode(mediaQuery.matches);

//         // Listen for changes
//         const handleChange = (e: any) => setIsDarkMode(e.matches);
//         mediaQuery.addEventListener("change", handleChange);

//         // Cleanup listener on unmount
//         return () => mediaQuery.removeEventListener("change", handleChange);
//     }, []);

//     // Set border color based on whether dark mode is enabled
//     const borderColor = isDarkMode ? "gray" : "black";

//     const [selectedValue, setSelectedValue] = useState<number | null>(null); // Track the selected dropdown value

//     // Handle dropdown change
//     const handleChange = (value: number) => {
//         setSelectedValue(value); // Update state when a value is selected
//     };

//     // Function to handle form submission
//     const handleFormSubmit = (jsonData: string) => {
//         // Send the JSON data to the API
//         sendToAPI(jsonData);
//     };

//     return (
//         <div className="">
//             {/* Render the dropdown */}
//             <Dropdown onChange={handleChange} />

//             <div className="flex w-full column justify-center">
//                 {/* Display the corresponding row from importedData as a table */}
//                 {selectedValue !== null && importedData[selectedValue] && (
//                     <div style={{ maxWidth: "100%", overflowX: "auto" }}>
//                         <h3>Selected Row Data:</h3>
//                         <table
//                             style={{
//                                 borderCollapse: "collapse",
//                                 minWidth: "600px",
//                             }}
//                         >
//                             <thead>
//                                 <tr>
//                                     {headers.map((header, index) => (
//                                         <th
//                                             key={index}
//                                             style={{
//                                                 border: `1px solid ${borderColor}`,
//                                                 padding: "8px",
//                                                 whiteSpace: "nowrap",
//                                             }}
//                                         >
//                                             {header}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     {importedData[selectedValue].map(
//                                         (item, index) => {
//                                             // Parse the item as a number
//                                             const parsedItem = parseFloat(item);

//                                             return (
//                                                 <td
//                                                     key={index}
//                                                     style={{
//                                                         border: `1px solid ${borderColor}`,
//                                                         padding: "8px",
//                                                         whiteSpace: "nowrap",
//                                                     }}
//                                                 >
//                                                     {
//                                                         // Check if parsedItem is a valid number
//                                                         !isNaN(parsedItem) &&
//                                                         isFinite(parsedItem)
//                                                             ? parsedItem.toFixed(
//                                                                   2
//                                                               ) // Format the number to 2 decimal places
//                                                             : item // If it's not a valid number, display the original item
//                                                     }
//                                                 </td>
//                                             );
//                                         }
//                                     )}
//                                 </tr>
//                             </tbody>
//                         </table>
//                         {/* Render the SubmitButton */}
//                         <SubmitButton
//                             headers={headers}
//                             values={importedData[selectedValue]}
//                             onSubmit={handleFormSubmit}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// // const ShowRow: React.FC = () => {
// //     const [selectedValue, setSelectedValue] = useState<number | null>(null); // Track the selected dropdown value

// //     // Handle dropdown change
// //     const handleChange = (value: number) => {
// //         setSelectedValue(value); // Update state when a value is selected
// //     };

// //     return (
// //         <div className="">
// //             {/* Render the dropdown */}
// //             <Dropdown onChange={handleChange} />

// //             <div className="flex w-full column justify-center">
// //                 {/* Display the corresponding row from importedData as a table */}
// //                 {selectedValue !== null && importedData[selectedValue] && (
// //                     <div style={{ maxWidth: "90%", overflowX: "auto" }}>
// //                         <h3>Selected Row Data:</h3>
// //                         <table
// //                             style={{
// //                                 borderCollapse: "collapse",
// //                                 minWidth: "600px",
// //                             }}
// //                         >
// //                             <thead>
// //                                 <tr>
// //                                     {headers.map((header, index) => (
// //                                         <th
// //                                             key={index}
// //                                             style={{
// //                                                 border: "1px solid black",
// //                                                 padding: "8px",
// //                                                 whiteSpace: "nowrap",
// //                                             }}
// //                                         >
// //                                             {header}
// //                                         </th>
// //                                     ))}
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 <tr>
// //                                     {importedData[selectedValue].map(
// //                                         (item, index) => {
// //                                             // Parse the item as a number
// //                                             const parsedItem = parseFloat(item);

// //                                             return (
// //                                                 <td
// //                                                     key={index}
// //                                                     style={{
// //                                                         border: "1px solid black",
// //                                                         padding: "8px",
// //                                                         whiteSpace: "nowrap",
// //                                                     }}
// //                                                 >
// //                                                     {
// //                                                         // Check if parsedItem is a valid number
// //                                                         !isNaN(parsedItem) &&
// //                                                         isFinite(parsedItem)
// //                                                             ? parsedItem.toFixed(
// //                                                                   2
// //                                                               ) // Format the number to 2 decimal places
// //                                                             : item // If it's not a valid number, display the original item
// //                                                     }
// //                                                 </td>
// //                                             );
// //                                         }
// //                                     )}
// //                                 </tr>
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// export default ShowRow;
