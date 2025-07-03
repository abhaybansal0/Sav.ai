
const authorize = async (req, res, next) => {
    try {

        if (!req.user.isAdmin) {
            throw new Error()
        }
        next();

    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Access denied." })
    }
}

export default authorize