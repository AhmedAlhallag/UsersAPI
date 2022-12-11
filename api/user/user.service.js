const pool = require("../../config/database")

module.exports = {

    create: (data, callback) => {

        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                                    values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results) => {

                if (error) {
                    return callback(error)
                }
                return callback(null, results)

            }

        )


    },

    getUsers: (callback) => {
        pool.query(
            `select * from registration`
            , [],
            (error, results) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },

    getUserById: (id, callback) => {
        pool.query(
            `select * from registration where uid = ?`
            , [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `update registration set firstName = ?, lastName = ? , email = ?, number = ? where uid = ?`
            ,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.number,
                data.id
            ], (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )

    },
    deleteUser: (id, callback) => {
        pool.query(
            `delete from registration where uid  = ?`
            ,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )

    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }




}