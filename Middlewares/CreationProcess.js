export default function validateRoleCreation(req, res, next) {
    const { name, imageUrl } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required",
            status: 400,
        });
    }

    next();
}
