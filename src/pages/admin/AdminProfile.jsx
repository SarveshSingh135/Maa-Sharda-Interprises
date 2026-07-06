// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminProfile() {
//   const navigate = useNavigate();

//   const admin =
//     JSON.parse(localStorage.getItem("admin")) || {
//       shopName: "Maa Sharda Enterprises",
//       adminName: "Admin",
//       email: "admin@gmail.com",
//       mobile: "9005622817",
//       address: "Prayagraj, Uttar Pradesh",
//       password: "123456",
//     };

//   const [shopName, setShopName] = useState(admin.shopName);
//   const [adminName, setAdminName] = useState(admin.adminName);
//   const [email, setEmail] = useState(admin.email);
//   const [mobile, setMobile] = useState(admin.mobile);
//   const [address, setAddress] = useState(admin.address);

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSave = () => {
//     let updatedPassword = admin.password;

//     if (
//       currentPassword ||
//       newPassword ||
//       confirmPassword
//     ) {
//       if (currentPassword !== admin.password) {
//         alert("Current Password is Wrong");
//         return;
//       }

//       if (newPassword.length < 6) {
//         alert("Password must be at least 6 characters");
//         return;
//       }

//       if (newPassword !== confirmPassword) {
//         alert("Passwords do not match");
//         return;
//       }

//       updatedPassword = newPassword;
//     }

//     const updatedAdmin = {
//       shopName,
//       adminName,
//       email,
//       mobile,
//       address,
//       password: updatedPassword,
//     };

//     localStorage.setItem(
//       "admin",
//       JSON.stringify(updatedAdmin)
//     );

//     alert("Profile Updated Successfully");

//     if (updatedPassword !== admin.password) {
//       navigate("/admin-login");
//     }
//   };

//   const handleLogout = () => {
//     navigate("/admin-login");
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#07173A",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         color: "#fff",
//         padding: "40px",
//       }}
//     >
//       <div
//         style={{
//           width: "550px",
//           background: "#10245d",
//           padding: "35px",
//           borderRadius: "15px",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//           }}
//         >
//           👤 Admin Profile
//         </h1>

//         <input
//           style={inputStyle}
//           value={shopName}
//           onChange={(e) =>
//             setShopName(e.target.value)
//           }
//           placeholder="Shop Name"
//         />

//         <input
//           style={inputStyle}
//           value={adminName}
//           onChange={(e) =>
//             setAdminName(e.target.value)
//           }
//           placeholder="Admin Name"
//         />

//         <input
//           style={inputStyle}
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//           placeholder="Admin Email"
//         />

//         <input
//           style={inputStyle}
//           value={mobile}
//           onChange={(e) =>
//             setMobile(e.target.value)
//           }
//           placeholder="Mobile Number"
//         />

//         <textarea
//           style={{
//             ...inputStyle,
//             height: "90px",
//           }}
//           value={address}
//           onChange={(e) =>
//             setAddress(e.target.value)
//           }
//           placeholder="Shop Address"
//         />

//         <hr
//           style={{
//             margin: "30px 0",
//             borderColor: "#555",
//           }}
//         />

//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "20px",
//           }}
//         >
//           🔒 Change Password
//         </h2>

//         <input
//           type="password"
//           style={inputStyle}
//           value={currentPassword}
//           onChange={(e) =>
//             setCurrentPassword(e.target.value)
//           }
//           placeholder="Current Password"
//         />

//         <input
//           type="password"
//           style={inputStyle}
//           value={newPassword}
//           onChange={(e) =>
//             setNewPassword(e.target.value)
//           }
//           placeholder="New Password"
//         />

//         <input
//           type="password"
//           style={inputStyle}
//           value={confirmPassword}
//           onChange={(e) =>
//             setConfirmPassword(e.target.value)
//           }
//           placeholder="Confirm Password"
//         />

//         <button
//           style={saveBtn}
//           onClick={handleSave}
//         >
//           💾 Save Changes
//         </button>

//         <button
//           style={logoutBtn}
//           onClick={handleLogout}
//         >
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "15px",
//   marginTop: "15px",
//   borderRadius: "10px",
//   border: "2px solid #d4af37",
//   background: "#1d1d1d",
//   color: "#fff",
//   fontSize: "17px",
//   boxSizing: "border-box",
// };

// const saveBtn = {
//   width: "100%",
//   padding: "15px",
//   marginTop: "25px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#28a745",
//   color: "#fff",
//   fontSize: "18px",
//   cursor: "pointer",
// };

// const logoutBtn = {
//   width: "100%",
//   padding: "15px",
//   marginTop: "15px",
//   border: "none",
//   borderRadius: "10px",
//   background: "#dc3545",
//   color: "#fff",
//   fontSize: "18px",
//   cursor: "pointer",
// };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("adminProfileImage") ||
      "/admin-profile.png"
  );

  const [shopName, setShopName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  useEffect(() => {
    const admin =
      JSON.parse(localStorage.getItem("admin")) || {
        shopName: "Maa Sharda Enterprises",
        adminName: "Admin",
        username: "admin",
        email: "admin@gmail.com",
        mobile: "9005622817",
        address: "Prayagraj",
        password: "123456",
      };

    setShopName(admin.shopName);
    setAdminName(admin.adminName);
    setUsername(admin.username || "admin");
    setEmail(admin.email);
    setMobile(admin.mobile);
    setAddress(admin.address);
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem(
        "adminProfileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
  const oldAdmin =
    JSON.parse(localStorage.getItem("admin")) || {};

  let updatedPassword =
    oldAdmin.password || "123456";

  if (
    currentPassword ||
    newPassword ||
    confirmPassword
  ) {
    if (currentPassword !== updatedPassword) {
      alert("Current Password is Wrong");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    updatedPassword = newPassword;
  }

  const updatedAdmin = {
    shopName,
    adminName,
    username,
    email,
    mobile,
    address,
    password: updatedPassword,
  };

  localStorage.setItem(
    "admin",
    JSON.stringify(updatedAdmin)
  );

  localStorage.setItem(
    "adminUsername",
    username
  );

  localStorage.setItem(
    "adminPassword",
    updatedPassword
  );

  localStorage.setItem(
    "adminEmail",
    email
  );

  alert("Profile Updated Successfully");

  if (updatedPassword !== oldAdmin.password) {
    navigate("/admin-login");
  }
};

const handleLogout = () => {
  navigate("/admin-login");
};

return (
  <div className="profile-page">
    <div className="profile-card">

      <h1>👤 Admin Profile</h1>

      <div className="profile-image">

        <img
          src={profileImage}
          alt="Profile"
        />

        <input
          type="file"
          onChange={handleImage}
        />

      </div>

      <input
        value={shopName}
        onChange={(e)=>setShopName(e.target.value)}
        placeholder="Shop Name"
      />

      <input
        value={adminName}
        onChange={(e)=>setAdminName(e.target.value)}
        placeholder="Admin Name"
      />

      <input
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        value={mobile}
        onChange={(e)=>setMobile(e.target.value)}
        placeholder="Mobile Number"
      />

      <textarea
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        placeholder="Address"
      />

      <h2>🔒 Change Password</h2>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e)=>setCurrentPassword(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />

      <label
        style={{
          color:"#fff",
          marginTop:"10px"
        }}
      >
        <input
          type="checkbox"
          checked={showPassword}
          onChange={()=>
            setShowPassword(!showPassword)
          }
        />

        Show Password

      </label>

      <button
        className="save-btn"
        onClick={handleSave}
      >
        💾 Save Changes
      </button>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  </div>
);
}

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "650px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "20px",
  padding: "35px",
  boxShadow: "0 15px 40px rgba(0,0,0,.35)",
};

const titleStyle = {
  color: "#fff",
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "32px",
  fontWeight: "700",
};

const imageStyle = {
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #D4AF37",
  display: "block",
  margin: "0 auto 15px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "2px solid #D4AF37",
  outline: "none",
  background: "#10245d",
  color: "#fff",
  fontSize: "16px",
  boxSizing: "border-box",
};

const saveBtn = {
  width: "100%",
  padding: "15px",
  marginTop: "25px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
  transition: ".3s",
};

const logoutBtn = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  background: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};