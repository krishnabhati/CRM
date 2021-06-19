module.exports = (app) => {
    const { validateToken } = require("../auth/user_auth");
    const users = require('../controller/usercontroller');


    // Create a new Note
     app.post('/signup',users.create);
    app.post('/login', users.login);
    app.get('/tasklist',validateToken, users.tasks);
}