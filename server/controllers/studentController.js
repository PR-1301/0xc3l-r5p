import Student from "../models/Student.js";

/**
 * @desc    Fetch all student responses from the database
 * @route   GET /api/students
 * @access  Public
 */
export const getAllResponses = async (req, res) => {
  try {
    const { role, subRole, department, year, search } = req.query;

    const query = {};

    // Filter by role category (Tech / Non-Tech)
    if (role) {
      query.role = role;
    }

    // Filter by specific subRole
    if (subRole) {
      query.subRole = subRole;
    }

    // Filter by department
    if (department) {
      query.department = new RegExp(`^${department.trim()}$`, "i");
    }

    // Filter by year
    if (year) {
      query.year = year;
    }

    // Search by Name, email, personalEmail, mobileNumber, or regNumber
    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { Name: searchRegex },
        { personalEmail: searchRegex },
        { email: searchRegex },
        { mobileNumber: searchRegex },
        { regNumber: searchRegex },
      ];
    }

    const students = await Student.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching student responses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student responses from database",
      error: error.message,
    });
  }
};

/**
 * @desc    Fetch student responses by specific department
 * @route   GET /departments/:departments
 * @access  Public
 */
export const getResponsesByDepartment = async (req, res) => {
  try {
    const department = req.params.departments || req.params.department;

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department parameter is required",
      });
    }

    // Case-insensitive department search
    const students = await Student.find({
      department: new RegExp(`^${department.trim()}$`, "i"),
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      department,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching responses by department:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch responses for this department",
      error: error.message,
    });
  }
};

/**
 * @desc    Fetch unique list of all departments with response count
 * @route   GET /api/students/departments
 * @access  Public
 */
export const getDepartmentsSummary = async (req, res) => {
  try {
    const departments = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments summary:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch departments summary",
      error: error.message,
    });
  }
};
