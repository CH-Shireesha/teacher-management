import React from "react";

interface HeaderProps {
  name: string;
  image: string;
}

const Header: React.FC<HeaderProps> = ({ name, image }) => (
  <header className="flex items-center justify-between bg-white shadow p-4 rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
    <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
  </header>
);

export default Header;
  