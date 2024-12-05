import { motion } from "framer-motion";
import React, { useState } from "react";
const images = import.meta.glob("../../assets/images/*.{jpg,png,tif}", {
    eager: true,
});

// Convert module values to string paths and pair them with dummy File objects
const imagePaths = await Promise.all(
    Object.values(images).map(async (mod, index) => {
        const path =
            typeof mod === "string"
                ? mod
                : (mod as { default: string }).default;

        // Fetch the image to get its binary content
        const response = await fetch(path);
        const blob = await response.blob();

        // Create a File object from the blob
        const file = new File([blob], `image${index}.jpg`, { type: blob.type });

        return { path, file };
    })
);
console.log(imagePaths); // Check the loaded image paths
const ImageGrid: React.FC = () => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null); // Track the currently flipped image

    // const handleFlip = (index: number) => {
    //     setFlippedIndex((prev) => (prev === index ? null : index)); // Flip the clicked image or reset
    // };

    const [delayedResultIndex, setDelayedResultIndex] = useState<number | null>(
        null
    ); // Track when to show "Result"

    const handleFlip = (body: Payload) => {
        if (flippedIndex === body.index) {
            // Unflip the card
            setFlippedIndex(null);
            setTimeout(() => setDelayedResultIndex(null), 350); // Minor delay before hiding the result
        } else {
            // Flip the new card
            setFlippedIndex(body.index);
            handleFormSubmit(body);
            setTimeout(() => setDelayedResultIndex(body.index), 350); // Minor delay before showing the result
        }
    };

    const handleChange = (value: number) => setSelectedValue(value);

    const [response, setResponse] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<number>(1);
    // const handleFormSubmit = (jsonData: string) => sendToAPI(jsonData);

    type Payload = {
        name: string;
        index: number;
        image: File; // Add the image as a File type
    };
    const handleFormSubmit = async (jsonData: Payload) => {
        try {
            console.log("Sent API call: ", jsonData);
            const formData = new FormData();

            // Append fields to FormData
            formData.append("index", jsonData.index.toString());
            formData.append("image", jsonData.image, jsonData.name);

            // Log the contents of FormData
            console.log("FormData being sent:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Send the FormData to the API endpoint
            const res = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData, // Don't set headers; fetch sets correct Content-Type for FormData
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch. Status: ${res.status}`);
            }

            const result = await res.json();
            console.log("API Response: ", result);
        } catch (error) {
            console.error("Error during API call: ", error);
        }
    };

    return (
        <div style={styles.grid}>
            {imagePaths.map(({ path, file }, index) => (
                <motion.div
                    key={index}
                    style={styles.card}
                    onClick={() =>
                        handleFlip({
                            name: path,
                            index,
                            image: file,
                        })
                    }
                    animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Front Side */}
                    <div style={{ ...styles.face, ...styles.front }}>
                        <img
                            src={path}
                            alt={`image-${index}`}
                            style={styles.image}
                        />
                    </div>

                    {/* Back Side */}
                    <div style={{ ...styles.face, ...styles.back }}>
                        <div style={styles.result}>
                            {delayedResultIndex === index ? response : ""}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // Limit to 5 columns per row
        gap: "15px",
        padding: "20px",
        width: "100%", // Full width
        maxWidth: "85%", // Optional: limit the grid's max width
        margin: "0 auto", // Center the grid
    },
    card: {
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "100%", // Make it a square
        transformStyle: "preserve-3d",
        cursor: "pointer",
    },
    face: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
    },
    front: {
        transform: "rotateY(0deg)",
    },
    back: {
        transform: "rotateY(180deg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    result: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
    },
};

export default ImageGrid;
