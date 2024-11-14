// Part 3: Function to send JSON data to the API
const sendToAPI = async (jsonData: string) => {
    try {
        const response = await fetch("http://localhost:5000/api/submit_row", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData), // Send the JSON data
        });

        if (!response.ok) {
            throw new Error("Failed to send data to the API");
        }

        const result = await response.json();
        console.log("API Response:", result); // Handle the response
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message); // Handle the error
        } else {
            console.error("Unknown error", error); // Handle unknown error types
        }
    }
};

export default sendToAPI;
