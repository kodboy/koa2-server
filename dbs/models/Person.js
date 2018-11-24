import mongoose from 'mongoose'

// Schema <-> 表的描述.
let personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

// 表名,collection的名字: `Person`
export default mongoose.model(`Person`, personSchema)