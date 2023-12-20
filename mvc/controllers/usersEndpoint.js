const User = require('../models/userModel')

async function handdleGetAllUsers(req, res) {
    try {
        const allDbUsers = await User.find({});
        res.json({ msg: "success", users: allDbUsers});
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handdleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.ID);
        res.status(200).json({ msg: "success", user: user});
    } catch (error) {
        console.error('Error retrieving user detail :', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handdleUpdateUserById(req, res) {
    try {
        const key = req.body.key;
        const value = req.body.value;
        await User.findByIdAndUpdate(req.params.ID, { $set : { [key] : value }})
        res.json({ msg: `Updated ${key} for id: ${req.params.ID}`});
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handdleDeleteUserById(req, res) {
    try {
        await User.findByIdAndDelete(req.params.ID);
        res.json({ msg: `Deleted user with id ${req.params.ID}`});
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handdleCreateNewUser(req, res) {
    try {
        const body = req.body;
        if(
            !body ||
            !body.firstName || 
            !body.email ||
            !body.gender ||
            !body.city
        ) { 
            res.json({ msg: "All fields are required..!"}) 
        }

        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            gender: body.gender,
            email: body.email,
            city: body.city
        })

        console.log('User : ', result);
        res.status(201).json({ msg: "User created successfully..!", id: result._id })
    } catch (error) {
        console.error('Error adding user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handdleGetAllUsers,
    handdleGetUserById,
    handdleUpdateUserById,
    handdleDeleteUserById,
    handdleCreateNewUser
}