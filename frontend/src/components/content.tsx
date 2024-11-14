import { motion } from "framer-motion";
import React, { useState } from "react";
const images = import.meta.glob("../../assets/images/*.{jpg,png,tif}", {
    eager: true,
});

// Convert module values to string paths
const imagePaths = Object.values(images).map((mod) =>
    typeof mod === "string" ? mod : (mod as { default: string }).default
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

    const handleFlip = (index: number) => {
        if (flippedIndex === index) {
            // Unflip the card
            setFlippedIndex(null);
            setTimeout(() => setDelayedResultIndex(null), 350); // Minor delay before hiding the result
        } else {
            // Flip the new card
            setFlippedIndex(index);
            setTimeout(() => setDelayedResultIndex(index), 350); // Minor delay before showing the result
        }
    };

    return (
        <div style={styles.grid}>
            {imagePaths.map((image, index) => (
                <motion.div
                    key={index}
                    style={styles.card}
                    onClick={() => handleFlip(index)}
                    animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Front Side */}
                    <div style={{ ...styles.face, ...styles.front }}>
                        <img
                            src={image}
                            alt={`image-${index}`}
                            style={styles.image}
                        />
                    </div>

                    {/* Back Side */}
                    <div style={{ ...styles.face, ...styles.back }}>
                        <div style={styles.result}>
                            {delayedResultIndex === index ? "Result" : ""}
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
