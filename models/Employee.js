// import mongoose, { Schema } from "mongoose";
// const employeeSchema = new mongoose.Schema({
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     employeeId: { type: String, required: true, unique: true },
//     fathername: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     dob: { type: Date, required: true },
//     doj: { type: Date, required: true },
//     education: { type: String, require: true },
//     gender: { type: String, required: true },
//     maritalStatus: { type: String },
//     designation: { type: String },
//     department: {
//         type: Schema.Types.ObjectId,
//         ref: "Department",
//         required: true,
//     },
//     salary: {
//         type: Number,

//     },
//     address1: { type: String, required: true },
//     address2: { type: String, required: true },
//     country: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Country",
//         required: true,
//     },
//     state: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "State",
//         required: true,
//     },
//     city: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "City",
//         required: true,
//     },
//     pin: { type: String, required: true },
//     panNumber: { type: String, required: true },
//     adarNumber: { type: String, required: true },
//     companyEmail: { type: String, required: true },
//     active: {
//         type: Number,
//         default: 1
//     },


// }, { timestamps: true });

// const Employee = mongoose.model("Employee", employeeSchema);

// export default Employee;
//pass-88KKje

import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  fathername: { type: String, required: true },
  dob: { type: Date, required: true },
  doj: { type: Date, required: true },
  education: { type: String, required: true },

  gender: { type: String },
  mobileNumber: { type: String, required: true },
  designation: { type: String, required: true },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  address: { type: String, required: true },
  salary: {
    type: Number,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  pin: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  salary: {
    type: Number,
    required: true,
  },
  active: { type: Number, default: 1 }


}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

