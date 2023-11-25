
// set paths for each requests
//SPS1 import express
const express=require('express')
// LRS6 import studentregister
const { studentRegister, getAllStudents, getSingleStudent, removeStudent, editStudent, studentLogin} = require('../Controllers/logic')
const studentupload = require('../multerConfig/studentStorageConf')




//SPS2 create an object for router class in express
const router=new express.Router()

// SPS3 register employee - post  LRS8 then goto all api     key               LRS7
router.post('/student/register',studentupload.single('student_profile'),studentRegister)

// api request employees in a table 
// GASS1 get all student then goto logic.js GASS3 then goto service-> allapi.js
router.get('/student/getStudentDetails',getAllStudents)

// router request single employyee in view
// GSES2 get single employees- get request then goto logic.js, GSES4(import getSingleEmployees),then goto clientsserver-> allAPI.js
router.get('/student/singleStudentDetail/:id',getSingleStudent) 

router.post('/student/StudentLogin',studentLogin)
// SPS4 exports router then goto index.js

// delete student
router.delete("/student/removeStudent/:id",removeStudent)

// edit student
router.put("/student/updateStudent/:id",studentupload.single('student_profile'),editStudent)



module.exports=router