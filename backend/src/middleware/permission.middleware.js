import { ROLE_PERMISSIONS } from "../config/roles.js";

export const checkPermission = (permission) => {
  return (req, res, next) => {

    console.log("==== DEBUG PERMISSION ====");
    console.log("User:", req.user);
    console.log("Role:", req.user?.role);
    console.log("Required Permission:", permission);
    console.log("User Permissions:", ROLE_PERMISSIONS[req.user?.role]);

    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const role = req.user.role.toLowerCase(); // keep this

    const permissions = ROLE_PERMISSIONS[role] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied"
      });
    }

    next();
  };
};