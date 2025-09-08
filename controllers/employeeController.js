import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";
import randomstring from "randomstring";
import { sendMail } from "../helpers/mailer.js"



const password = randomstring.generate(8);

export const addemployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      fathername,
      dob,
      doj,
      gender,
      education,
      mobileNumber,
      designation,
      department,
      role,
      address,
      country,
      state,
      city,
      pin,
      maritalStatus,
      salary,
      companyId
    } = req.body;



    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already register" });
    }
    console.log(`the passwrd is ${password}`)
    const hashPassword = await bcrypt.hash(password, 10);




    const newUser = await User({
      name,
      email,
      password,
      role,

    });


    const savedUser = await newUser.save();


    const newEmployee = new Employee({
      userId: savedUser._id,
      name,
      email,
      employeeId,
      fathername,
      dob,
      doj,
      gender,
      education,
      mobileNumber,
      designation,
      department,
      role,
      address,
      country,
      state,
      city,
      pin,
      maritalStatus,
      salary,
      companyId
    });

    const userData = await newEmployee.save();

    console.log(userData)
    //EDE7qCjD ??ayan@user.com

    const content = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2a9d8f;">Welcome to Cruise Ship Management, ${savedUser.name}!</h2>
    <p>We're excited to have you onboard. Your account has been successfully created. Please find your login credentials below:</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Name:</td>
        <td style="padding: 8px;">${savedUser.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">${savedUser.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Password:</td>
        <td style="padding: 8px;">${password}</td>
      </tr>
    </table>

    <p style="margin-top: 20px;">You can now <a href="https://erpsolution-w9r2.vercel.app" style="color: #2a9d8f; text-decoration: none;"><b>login</b></a> using the credentials above.</p>
    
    <p>Thanks,<br/>Cruise Ship Management Team</p>
  </div>
`;

    await sendMail(savedUser.email, "Account Created", content);


    return res
      .status(201)
      .json({ success: true, message: "Employee Created!!!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: true, error });
  }
};



export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ active: 1 }).populate("state").populate("city").populate("userId").populate("country").populate('companyId');


    return res.status(200).json({
      success: true,
      msg: "Employees Data",
      employees: employees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployeeById = async (req, res) => {

  const { id } = req.params;

  try {
    let employee;
    employee = await Employee.findById({ _id: id }).populate('userId');

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    return res.status(200).json({ success: true, employee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}


export const deactivateEmployee = async (req, res) => {

  try {
    const { id } = req.params;

    const emp = await Employee.findByIdAndUpdate(
      id,
      { active: 0 },
      { new: true }
    );

    if (!emp) {
      return res.status(404).json({ success: false, error: "Company not found" });
    }

    res.json({ success: true, emp });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }

}