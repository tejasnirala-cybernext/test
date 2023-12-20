const express = require('express')
const {
    handdleGetAllUsers,
    handdleGetUserById,
    handdleUpdateUserById,
    handdleDeleteUserById,
    handdleCreateNewUser
} = require('../controllers/usersEndpoint')

const router = express.Router()

router
.route('/')
.get(handdleGetAllUsers)
.post(handdleCreateNewUser)

router
.route('/:ID')
.get(handdleGetUserById)
.patch(handdleUpdateUserById)
.delete(handdleDeleteUserById)

module.exports = router
