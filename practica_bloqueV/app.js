const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const MI_CLAVE = 'miclave';

app.use(express.urlencoded({ extended: true }));

let checkAuth = ((req, res, next) => {
    let token = req.headers['access-token'];

    if (token) {
        // Comprobamos la información
        jwt.verify(token, MI_CLAVE, (err, data) => {

            if (err) {
                console.log(err.message);
                return res.json({ message: 'token invalid' });
            } else {
                req.user_permissions = data.permissions;
                next();
            }

        });
    } else {
        res.json({ message: 'unauthorized' });
    }
})

app.post('/auth', (req, res) => {
    if ((req.body.user == 'user1' && req.body.password == 'password') ||
    (req.body.user =='user2' && req.body.password =='password')) {
        let payload = {};
        if (req.body.user ='user1'){
            payload = {permissions: ['read', 'write', 'delete']
          };
        }else if(req.body.user ='user2'){
            payload = {permissions: ['read']
          };  
        }  
        const token = jwt.sign(payload, MI_CLAVE, {
            expiresIn: 3600
        });

        res.json({ token: token });
    } else {
        res.json({ status: false, message: 'User invalid' });
    }
});








app.get('/', checkAuth, (req, res) => {
    if (req.user_permissions.includes('read')) {
        res.send('<h1>Inicio</h1>');
    } else {
        res.json({ message: 'no tienes permisos' });
    }

});

app.get('/info', checkAuth, (req, res) => {
    if (req.user_permissions.includes('read')) {
        res.send('<h1>Estamos en Info</h1>');
    } else {
        res.json({ message: 'no tienes permisos' });
    }
});

app.get('/info/:parameter', checkAuth, (req, res) => {
    if (req.user_permissions.includes('read')) {
        res.send(`<h1>Estamos en info con el parámetro ${req.params.parameter}</h1>`);
    } else {
        res.json({ message: 'no tienes permisos' });
    }
});

app.post('/save', checkAuth, (req, res) => {
    if (req.user_permissions.includes('write')) {
        res.send('<h1>Guardamos la información</h1>');
    } else {
        res.json({ message: 'no tienes permisos' });
    }
});

app.delete('/delete', checkAuth, (req, res) => {
    if (req.user_permissions.includes('delete')) {
        res.send('<h1>Eliminamos la información</h1>');
    } else {
        res.json({ message: 'no tienes permisos' });
    }
});

app.listen(port, () => {
    console.log(`Server listening in ${port}`);
});