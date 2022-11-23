const { userController } = require("../controllers");

module.exports = (router, auth) => {
    router.post("/user/register", async (req, res) => {
        const { name, email, password , isAdmin} = req.body;
        return await userController.registerUser(name, email, password,isAdmin, res);
    });

    router.post("/user/login", async (req, res) => {
        const { email, password } = req.body;
        return await userController.loginUser(email, password, res);
    });

    return router;
}