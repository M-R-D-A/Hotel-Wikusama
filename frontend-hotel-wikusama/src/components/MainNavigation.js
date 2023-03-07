import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";


function MainNavigation() {
  const ctx = useContext(AuthContext);

  return (
    <header className="w-full h-16 justify-center flex mx-auto items-center shadow-md">
        {!ctx.isLoggedIn && (
          <nav>          
          <ul className="flex gap-6 ">
          <h1 className='top-3 font-semibold items-center left-12 absolute text-xl'>Wikusama</h1>
            {/* Home */}
            <li> 
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
                end
              >
                Home
              </NavLink>
            </li>
            {/* Pemesanan */}
            <li> 
              <NavLink
                to="/pemesanan"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear" 
                }
              >
                Pemesanan
              </NavLink>
            </li>
            {/* Daftar Kamar */}
            <li> 
              <NavLink
                to="/daftar_kamar"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear" 
                }
              >
                Daftar Kamar
              </NavLink>
            </li>
            {/* About */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                About
              </NavLink>
            </li>
            {/* Login */}
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
        )}
        {ctx.isLoggedIn && ctx.role === 'resepsionis' && (
          <nav>          
          <ul className="flex gap-6 ">
          <h1 className='top-3 font-semibold items-center left-12 absolute text-xl'>Resepsionis</h1>
            <li> 
            <NavLink
                to="/resp"
                end
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Pemesanan
              </NavLink>
            </li>
            <li> 
            <NavLink
                to="/resp/detail"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Detail
              </NavLink>
            </li>
            <li> 
            <NavLink
                to="/resp/editStatus"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Edit Status
              </NavLink>
            </li>
            <li> 
            <button
                onClick={ctx.onLogout}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                logout
              </button>
            </li>
          </ul>
        </nav>
        )}
        {ctx.isLoggedIn && ctx.role === 'admin' && (
          <nav>          
          <ul className="flex gap-6 ">
          <h1 className='top-3 font-semibold items-center left-12 absolute text-xl'>Admin</h1>
            <li> 
            <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                User
              </NavLink>
            </li>
            <li> 
            <NavLink
                to="/admin/kamar"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Kamar
              </NavLink>
            </li>
            <li> 
            <NavLink
                to="/admin/tipekamar"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                Tipe Kamar
              </NavLink>
            </li>
            <li> 
            <button
                onClick={ctx.onLogout}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold bg-gray-300 p-2 rounded-full transition-all duration-200 ease-linear"
                    : "hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ease-linear"
                }
              >
                logout
              </button>
            </li>
          </ul>
        </nav>
        )}
        
    </header>
  );
}

export default MainNavigation;
