const User = require('../models/user');


async function handleGetAllUsers(req, res) {
    const alldbusers = await User.find();
    return res.json(alldbusers);
}
async function handleGetUserById(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({status:"error",message:"user not found"});
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    const userId = req.params.id;
    await User.findByIdAndUpdate(userId,{last_name:"changed"});
    return res.json({status:"success"}); 
}

async function handleDeleteUserById(req, res) {
    const userId = (req.params.id);
    await User.findByIdAndDelete(userId);
    return res.json({status:"success"});
}

// async function handleCreateUserById(req, res) {
//     const body= req.query;
//    if(!body || !body.first_name || !body.last_name || !body.email ||!body.gender||!body.job_title){
//     return res.status(400).json({status:"error",message:"first_name,last_name and email are required"});
//    }
//     const result = await User.create({
//     first_name: body.first_name,
//     last_name: body.last_name,
//     email: body.email,
//     gender: body.gender,
//     job_title: body.job_title,
//    });
   
//    return res.json({status:"success",id:result._id}); 
// }

async function handleCreateUserById(req, res) {
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({
      status: "error",
      message: "first_name, last_name, email, gender and job_title are required",
    });
  }

  const result = await User.create({
    first_name,
    last_name,
    email,
    gender,
    job_title,
  });

  return res.status(201).json({
    status: "success",
    id: result._id,
  });
}



module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById,
};