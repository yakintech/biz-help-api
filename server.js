const express = require('express');
const users = require('./data/users');
const app = express();
const cors = require('cors');
const PORT = 8080

//JWT integration
const jwt = require('jsonwebtoken');
app.use(cors());


app.use(express.json());

app.use((req, res, next) => {

    if (req.path === '/api/login') {
        next();
        return;
    }

    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const result = jwt.verify(token, 'secret');
            next();
        }
        else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(401);
    }

}
);


app.get('/api/users', (req, res) => {
    res.json(users);
});



app.post('/api/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email == "a@a.com" && password == "1234") {
        const token = jwt.sign({ email: "a@a.com" }, 'secret');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}
);









app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);




