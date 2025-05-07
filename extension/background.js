const COHERE_API_KEY = "z68jqX34NdW7skIV2QjAezwyqENUvxrzkQfZw5RP";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "convert") {
        console.log("Received convert request:", request);
        const endpoint = "https://api.cohere.ai/v1/chat";
        const prompt = `Convert the following ${request.script === "devanagari" ? "Hindi" : "Urdu"} text to a custom Latin script (transliteration, not translation):\n\n${request.text}`;
        const payload = {
            model: "command-r-plus", // You can use "command" or "command-r-plus" (if available)
            message: prompt,
            // Optionally, you can add temperature, max_tokens, etc.
        };
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${COHERE_API_KEY}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            console.log("Cohere API response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Cohere API response data:", data);
            let converted = request.text;
            if (data.text) {
                converted = data.text;
            } else if (data.reply) {
                converted = data.reply;
            } else if (data.generations && data.generations[0] && data.generations[0].text) {
                converted = data.generations[0].text;
            } else if (data.message) {
                converted = data.message;
            } else if (data.error) {
                console.error("Cohere API error:", data.error);
                converted = `[Cohere API error: ${data.error.message || "Unknown error"}]`;
            } else {
                console.error("Unexpected Cohere API response:", data);
                converted = "[Unexpected Cohere API response]";
            }
            sendResponse({ converted });
        })
        .catch((err) => {
            console.error("Cohere API fetch error:", err);
            sendResponse({ converted: request.text });
        });
        return true;
    }
});

chrome.runtime.onStartup.addListener(function() {
    console.log("Extension started with browser.");
    // Any initialization code here
});