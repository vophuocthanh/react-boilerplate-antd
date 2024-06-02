import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import logo from "../assets/logo.webp";
import { Button } from "antd";

// This should be a common component, not a layout

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-[#FCFCFC]">
      <div className="flex items-center gap-[82px] flex-1">
        <Logo />
      </div>
      <UserAdmin />
    </div>
  );
};

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-4">
      <img src={logo} alt="logo" className="object-cover w-16 h-16" />
    </Link>
  );
}

function UserAdmin() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successfully!");
  };
  return (
    <div className="flex items-center flex-shrink-0 gap-5">
      <div className="flex items-center gap-[10px] flex-shrink-0">
        <Button type="text" icon={<LogOut />} onClick={logout}></Button>
      </div>
    </div>
  );
}

export default TopBar;
