const query = async (data) => {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
        }

        const result = await response.json();
        return result[0].summary_text;
    } catch (error) {
        console.error("Error querying the Hugging Face API:", error);
        throw error;
    }
};

module.exports = query;





