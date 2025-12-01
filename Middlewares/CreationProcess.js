export default function validateTrainerProfileCreation(req, res, next) {

    try {
        const { name, specialization, experience_years, profile_image,Gender } = req.body;

        if (!name || typeof name !== "object")
            return res.status(400).json({ error: "Name object is required" });

        const { first_name, last_name } = name;

        if (!first_name?.trim())
            return res.status(400).json({ error: "Please enter first_name" });

        if (!last_name?.trim())
            return res.status(400).json({ error: "Please enter last_name" });

        if (!specialization)
            return res.status(400).json({ error: "Specialization is required" });

        if (!Gender)
            return res.status(400).json({ error: "Gender is required" });

        if (!experience_years)
            return res.status(400).json({ error: "experience_years is required" });

        if (!profile_image)
            return res.status(400).json({ error: "profile_image is required" });

        next();

    } catch (err) {
        return res.status(500).json({
            error: "Error validating trainer profile",
            details: err.message
        });
    }
}