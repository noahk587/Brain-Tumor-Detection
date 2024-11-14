// Part 1: Convert arrays to an object
export function convertToObj(headers: string[], values: string[]) {
    const result: { [key: string]: string } = {};

    headers.forEach((header, index) => {
        result[header] = values[index] || ""; // Assign an empty string if value is missing
    });

    return result;
}

// Example usage:
// const headers = ["ID", "Name", "Age"];
// const values = ["1", "John Doe", "30"];
// console.log(convertToObj(headers, values));
// Output: { ID: "1", Name: "John Doe", Age: "30" }
