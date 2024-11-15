import LocaleSwitcher from "@/components/LanguageSwitcher";
import LogoutButton from "./LogoutButton";

const Navbar = ({ handleLogout }) => {
  return (
    <div className="navbar bg-base-200 sticky top-0 z-50 ">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto w-full">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Nuicode Todo</a>
        </div>
        <div className="flex lg:gap-4 gap-2">
          <LocaleSwitcher />
          {handleLogout && <LogoutButton handleLogout={handleLogout} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
