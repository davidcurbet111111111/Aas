const express = require("express");

const app = express();
const PORT = process.env.PORT || 5908;

app.use(express.json());
app.use(express.static("public"));

// API route to shorten URL
app.post("/shorten", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.json({ error: "Please enter a destination URL" });
    }

    try {
        const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const shortUrl = await response.text();

        if (shortUrl.startsWith("Error")) {
            return res.json({ error: shortUrl });
        }

        res.json({ shortUrl });
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
