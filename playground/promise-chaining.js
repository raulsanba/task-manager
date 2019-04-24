require('../src/db/mongoose')

const User = require('../src/models/user')

//5ca8915d564b423cb0dd7d3a

// User.findByIdAndUpdate('5ca8915d564b423cb0dd7d3a', {age: 1}).then((user)=>{
//     console.log(user)

//     return User.countDocuments({age :1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

// const UpdateAgeAndCountb = async (id, age) =>{
//     const user = await User.findByIdAndUpdate(id, {age: age})
//     const count = User.countDocuments({age})
//     return count
// }

// UpdateAgeAndCountb("5ca8915d564b423cb0dd7d3a", 2).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })