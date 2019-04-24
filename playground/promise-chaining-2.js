require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete( {_id: "5ca9dbe1829ef513e0179a8b"}).then((result)=>{
//     console.log(result)
//     return Task.countDocuments({completed: false})
// }).then((sol)=>{
//     console.log(sol)
// }).catch((e)=>{
//     console.log(e)
// })
 
const deleteAndCount = async(_id) =>{
    const deleteid = await Task.findByIdAndDelete(_id) 
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteAndCount("5cacf386d218bc2c10d1c06f").then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})