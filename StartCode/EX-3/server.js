
import express from 'express';
import courses from './course.js';

import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;
app.use(logger);

app.get(
    '/departments/:dept/courses',
    auth,
    validateQuery,
    (req, res) => {

        const { dept } = req.params;

        const {
            level,
            minCredits,
            maxCredits,
            semester,
            instructor
        } = req.query;

        let filtered = courses.filter(course => {

            if (course.department !== dept) return false;

            if (level && course.level !== level) return false;

            if (semester && course.semester !== semester) return false;

            if (
                instructor &&
                !course.instructor
                    .toLowerCase()
                    .includes(instructor.toLowerCase())
            ) {
                return false;
            }

            if (
                minCredits &&
                course.credits < Number(minCredits)
            ) {
                return false;
            }

            if (
                maxCredits &&
                course.credits > Number(maxCredits)
            ) {
                return false;
            }

            return true;
        });

        res.json({
            results: filtered,
            meta: {
                total: filtered.length
            }
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});