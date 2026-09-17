import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
  try {
    const { username, pin} = req.body;
    const providedPin = pin;

    const envUsername = process.env.ADMIN_USERNAME;
    const envPin = process.env.ADMIN_PIN;

    if (!username || !providedPin) {
      return res.status(400).json({
        success: false,
        message: "Username and PIN are required.",
      });
    }

    // Verify credentials
    if (username.trim() !== envUsername || providedPin.toString().trim() !== envPin.toString().trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or PIN.",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { username: envUsername, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

/**
 * @desc    Verify if stored token is still valid
 * @route   GET /verify
 * @access  Private (Admin)
 */
export const verifyAdminSession = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin session is valid",
    admin: req.admin,
  });
};
