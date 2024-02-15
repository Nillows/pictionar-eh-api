const express = require("express");
const router = express.Router();
const { User } = require("../models"); //Imports user model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const withTokenAuth = require("../middleware/withTokenAuth");

// GET all users
router.get("/", (req, res) => {
    User.findAll().then(dbUsers => {
        res.json(dbUsers);
    }).catch(err => {
        res.status(500).json({ msg: `Server Error!`, err });
    })
})

// GET one user
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
    }).then(dbUser => {
        res.json(dbUser);
    }).catch(err => {
        res.status(500).json({ msg: `Server Error!`, err });
    })
})

// CREATE new user
router.post('/', (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        highscore: 0
    }).then(newUser => {
        const token = jwt.sign({
            id: newUser.id,
            username: newUser.username
        }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        res.json({
            token: token,
            user: newUser
        });
    }).catch(err => {
        console.log("error creating user:", err);
        res.status(500).json({ msg: `Server error!`, err });
    });
    console.log(req.body);
});

// LOGOUT route
router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (!err) {
                res.status(200).json({ msg: "Logged out!" })
            } else {
                res.status(500).json({ msg: "Server error!", err })
            }
        })
    }
})

// DELETE user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUser => {
        res.json(dbUser);
    }).catch(err => {
        res.status(500).json({ msg: `Server error!`, err });
    })
})

// UPDATE user route
router.put('/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(dbUser => {
            if (!dbUser) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (req.body.username) {
                dbUser.username = req.body.username;
            }
            if (req.body.email) {
                dbUser.email = req.body.email;
            }
            if (req.body.password) {
                dbUser.password = req.body.password;
            }
            if (req.body.highscore) {
                dbUser.highscore = req.body.highscore
            }

            return dbUser.save();
        }).then(updatedUser => {
            res.json(updatedUser);
        }).catch(err => {
            res.status(500).json({ msg: `Server error!`, err });
        })
})

// Add profile pic route
router.put('/pfp/:id', (req, res) => {
    const pfpUrl = { profile_picture: req.body.profilePicture }
    User.update(pfpUrl, {
        where: {
            id: req.params.id
        }
    }).then(updatedUser => {
        if (!updatedUser) {
            res.json({ msg: "No such user to update." })
        } else {
            res.json({ msg: "User succesfully updated!" })
        }
    }).catch(err => {
        res.status(500).json({ msg: `Server Error!`, err });
    })
})

// login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUser => {
        if (!dbUser || !dbUser.PasswordAuth(req.body.password)) {
            res.status(401).json({ msg: "Incorrect user credentials" });
        } else {
            const token = jwt.sign({
                id: dbUser.id,
                username: dbUser.username
            }, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            console.log('token', token);
            res.json({
                token: token,
                user: dbUser
            });
        }
    }).catch(err => {
        res.status(500).json({ msg: `Server Error!`, err });
    });
});

router.post("/", withTokenAuth, (req, res) => {
    res.json({ msg: "test" })
})

module.exports = router;
