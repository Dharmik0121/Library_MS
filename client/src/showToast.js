import toast from "react-hot-toast";

export const showToast = (message, type = "default") => {
  const icons = {
    success: "🟢", // Green check for success
    error: "🔴", // Red cross for error
  };

  toast(message, {
    icon: icons[type] || icons.default, // Pick icon dynamically
    position: "top-right", // Set position globally
    style: {
      boxShadow: " 0 0 0 0",
      background: "#c7c7c7",
    },
  });
};
