import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Pemesanan", href: "/pemesanan" },
  { name: "About", href: "/about" },
];

const navbar = () => {
  return (
    <div className="top-0 w-full bg-gray-900">
      <div className="flex-1 items-center justify-center sm:items-center sm:justify-start">
        <div className="hidden: sm:block sm:ml-6">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                className={({ isActive }) => {
                  return (
                    "px-3 py-2 rounded-md text-sm font-medium no-underline" +
                    (isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white")
                  );
                }}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
