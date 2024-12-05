import { motion } from "framer-motion";
import React, { useState } from "react";
const images = import.meta.glob("../../assets/images/*.{jpg,png,tif}", {
    eager: true,
});

// Convert module values to string paths and pair them with dummy File objects
const imagePaths = Object.values(images).map((mod, index) => {
    const path =
        typeof mod === "string" ? mod : (mod as { default: string }).default;
    const file = new File([`Dummy Content ${index}`], `image${index}.jpg`, {
        type: "image/jpeg",
    }); // Mock File object
    return { path, file };
});

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
            let body = JSON.stringify(jsonData);

            // Prepare form data for the API request
            const formData = new FormData();
            formData.append("index", jsonData.index.toString());
            formData.append("image", jsonData.image, "uploaded_image.jpg");

            // Assuming you have an API endpoint to handle the request
            const res = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });

            const data = await res.json();

            console.log("Received API call (RESP): ", res);
            // Update the response state with the result from the API
            setResponse(data.prediction); // Assuming the API returns a field named `prediction`
        } catch (error) {
            console.error("Error submitting data:", error);
            setResponse("Error occurred"); // In case of error
        }
    };

    return (
        <div style={styles.grid}>
            {imagePaths.map((image, index) => (
                <motion.div
                    key={index}
                    style={styles.card}
                    onClick={() =>
                        handleFlip({
                            name: image.path,
                            index,
                            image: image.file,
                        })
                    }
                    animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Front Side */}
                    <div style={{ ...styles.face, ...styles.front }}>
                        <img
                            src={image.path}
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
