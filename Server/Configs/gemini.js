const Gemini_URL =
    "https://generativelanguage.googleapis.com/v1beta/interactions";

export const generateGeminiResponse = async ({
    prompt,
    apikey,
    user
}) => {
    try {
        if (!apikey) {
            throw new Error("Gemini API key missing");
        }

        const response = await fetch(Gemini_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apikey
            },

            body: JSON.stringify({
                model: "gemini-3.6-flash",
                input: prompt
            })
        });

        if (!response.ok) {

            // =========================
            // INVALID API KEY
            // =========================

            if (
                response.status === 400 ||
                response.status === 401
            ) {
                user.geminiStatus = "invalid";

                await user.save();
            }

            // =========================
            // QUOTA EXCEEDED
            // =========================

            if (response.status === 429) {
                user.geminiStatus = "quota_exceeded";

                await user.save();
            }

            const err = await response.text();

            throw new Error(err);
        }

        // =========================
        // SUCCESS STATUS
        // =========================

        user.geminiStatus = "active";

        await user.save();

        // =========================
        // RESPONSE
        // =========================

        const data = await response.json();

        const text = data.steps
            ?.find(step => step.type === "model_output")
            ?.content
            ?.find(content => content.type === "text")
            ?.text;

        if (!text) {
            throw new Error(
                "No text returned from Gemini"
            );
        }

        return text.trim();

    } catch (error) {

        console.error(
            "Gemini Fetch Error:",
            error.message
        );

        throw new Error(
            "Gemini API fetch failed"
        );
    }
};