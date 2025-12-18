const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json()); 

const PORT = 3000;
const GITLAB_API_URL = "https://gitlab.com/api/v4/projects/75788738/issues";
const PRIVATE_TOKEN = process.env.GITLAB_TOKEN;

app.post('/create-issue', async (req, res) => {
    try {
        const { title, description, labels } = req.body;

        const response = await axios.post(GITLAB_API_URL, {
            title,
            description,
            labels
        }, {
            headers: {
                'PRIVATE-TOKEN': PRIVATE_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        res.status(201).json({
            message: "Issue created successfully!",
            data: response.data
        });
    } catch (error) {
        console.error('Error connecting to GitLab:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: "Failed to create GitLab issue",
            details: error.response?.data
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});