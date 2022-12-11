const { create, getUsers, getUserById, updateUser, deleteUser, getUserByUserEmail } = require("./user.service")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")

module.exports = {

    createUsers: (req, res) => {

        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        create(body, (err, results) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })

    },
    getAllUsers: (req, res) => {

        getUsers((err, results) => {
            for (i = 0; i < results.length; i++) {
                results[i].delete = `<button class="delete" name="${results[i].uid}"> Delete </button>`
                // results[i].update = `<a href="/edit.html?id=${results[i].uid}" target="_blank" class="update" name="${results[i].uid}"> Update </a>`
            }
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
        // res.end()


    },

    getUserById: (req, res) => {
        id = req.params.id
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })


    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        // results.password = null
        updateUser(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to updated User"
                })
            }
            return res.json({
                success: 1,
                message: "User updated successfully"
            })
        })


    },


    deleteUser: (req, res) => {
        // const body = req.body;

        id = req.params.id

        deleteUser(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found."
                })
            }

            return res.json({
                success: 1,
                message: "User deleted successfully"
            })
        })


    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                // results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },



}