// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    let filtered = courses.filter(courses => {
        if (courses.department !== dept) return false;
        
        if (level && courses.level !== level) return false;
        if (semester && courses.semester !== semester) return false;
        if (instructor && courses.instructor !== instructor) return false;

        if (minCredits && courses.credits < Number(minCredits)) return false;
        if (maxCredits && courses.credits > Number(maxCredits)) return false;

        return true;
    })
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
