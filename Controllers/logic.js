
// All logics

const students = require("../Models/erpModel")

// LRS1 register logic then goto storageConf.js
studentRegister = async (req, res) => {
    //LRS3 for profile
    const file = req.file.filename

    //LRS4 for erpdetails
    const { rollNo, fname, lname, email, password, mobile, gender, department, admissionQuota, location } = req.body
    if (!rollNo || !fname || !lname || !email || !password || !file || !mobile || !gender || !department || !admissionQuota || !location) {
        res.status(404).json("All inputs are required")
    }
    try {
        const preStudent = await students.findOne({ email })

        if (preStudent) {
            res.status(403).json("Student Already Present")
        }
        else {
            // create object for new student
            const newStudent = new students({ rollNo, fname, lname, email, password, mobile, gender, department, admissionQuota, profile: file, location })
            await newStudent.save()

            res.status(203).json(newStudent)
        }
    }
    catch (err) {
        res.status(400).json("Logic Error")
        console.log(err);
    }
}

// GASS2 get all employees after exports goto router
getAllStudents = async (req, res) => {
    // access search data from request query
    const { search } = req.query
    // regular expreesion query
    const query = {
        fname: { $regex: search, $options: 'i' }
    }
    try {
        const allStudents = await students.find(query)
        res.status(207).json(allStudents)
    }
    catch (err) {
        res.status(400).json(err)
    }

}

// Login student
studentLogin = async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.json({
                message: 'All field are required',
                success: false
            })
        }
        const user = await students.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'Used not found',
                success: false
            })

        }
        if (password == user.password) {
            res.status(200).json({
                message: "User login Successfully",
                success: true,
                email: user.email,
                id: user._id
            })
        }
        // const user=await students.findOne({email:email,password:password})
        // if(user){
        //     res.send(user)
        // }
        // else{
        //     return res.status(400).json({message:"Login Faield"})
        // }
    }
    catch (err) {
        res.status(400).json({ err })
    }
}

// GSES3 get single employyees after exports goto router
getSingleStudent = async (req, res) => {
    const param = req.params.id//or const {id}=req.params.id
    try {
        const sStudent = await students.findOne({ _id: param })
        res.status(200).json(sStudent)
    }
    catch (err) {
        res.status(400).json(err)
    }
}


// logic to remove student
removeStudent = async (req, res) => {
    const param = req.params.id
    try {
        const removedStudent = await students.findByIdAndDelete({ _id: param })
        res.status(200).json(removedStudent)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// update student
editStudent = async (req, res) => {
    const param = req.params.id
    const { rollNo, fname, lname, email, password, mobile, gender, department, admissionQuota, location, student_profile } = req.body
    const file = req.file ? req.file.filename : student_profile
    if (!rollNo || !fname || !lname || !email || !password || !mobile || !gender || !department || !admissionQuota || !location) {
        res.status(404).json("All inputs are required")
    }
    try {
        const user = await students.findOne({ _id: param })
        if (user) {
            user.rollNo = rollNo
            user.fname = fname
            user.lname = lname
            user.email = email
            user.password = password
            user.mobile = mobile
            user.gender = gender
            user.department = department
            user.admissionQuota = admissionQuota
            user.location = location
            user.profile = file

            user.save()
            res.status(204).json(user)
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}



// LRS5 export studentRegister then goto routes.js
module.exports = {
    studentRegister, getAllStudents, getSingleStudent, studentLogin, removeStudent, editStudent
}
