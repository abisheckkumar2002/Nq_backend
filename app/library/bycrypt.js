const bycrypt = require('bcrypt');


exports.generatepassword = ( password)=>{
    try {
        let salt = bycrypt.genSaltSync(10);
        let hash = bycrypt.hashSync(password, salt);

        return {
            "passwordStatus": true,
            hash
        }
    }
    catch (err) {
        return {
            "passwordStatus": false
        }
    }
}



exports. comparePassword = (password, hashPassword) => {
    try {
        let comparePwd = bycrypt.compareSync(password, hashPassword);

        return {
            "compareStatus": comparePwd
        }
    }
    catch (err) {
        return {
            "compareStatus": false
        }
    }
}





