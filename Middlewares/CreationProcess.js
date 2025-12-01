export default function validateTraineeProfileCreation(req, res, next) {

    try {
        const { name, date_of_birth, gender, effort_level, gone_Days } = req.body;

        // Ensure name object exists
        if (!name || typeof name !== 'object') {
            return res.status(400).json({ error: 'Name object is required' });
        }

        const { first_name, middle_name, last_name } = name;

        if (!first_name?.trim()) {
            return res.status(400).json({ error: 'Please enter first_name' });
        }


        if (!last_name?.trim()) {
            return res.status(400).json({ error: 'Please enter last_name' });
        }

        if (!date_of_birth) {
            return res.status(400).json({ error: 'Please enter date of birth' });
        }

        const birthDate = new Date(date_of_birth);
        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format for date_of_birth' });
        }

        const today = new Date();
        if (birthDate > today) {
            return res.status(400).json({ error: 'Date of birth cannot be in the future' });
        }

        if (!gender) {
            return res.status(400).json({ error: 'Please enter gender' });
        }


        if (!effort_level) {
            return res.status(400).json({ error: 'Please enter effort level' });
        }

        const validEffortLevels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
        if (!validEffortLevels.includes(effort_level)) {
            return res.status(400).json({
                error: `Effort level must be one of: ${validEffortLevels.join(', ')}`
            });
        }

        if (!gone_Days){
            res.status(400).json({ error: 'gone_Days is required' });
        }

        next();


    } catch (error) {
        return res.status(500).json({
            error: 'Error validating trainee profile data',
            details: error.message,
        });
    }
}