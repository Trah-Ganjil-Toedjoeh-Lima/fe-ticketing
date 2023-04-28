import React from "react";

export const Button = ({ name, onClick }) => {
  return (
    <a
      className='group relative inline-block px-4 py-2 font-medium'
      onClick={onClick}
    >
      <span className='absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
      <span className='absolute inset-0 h-full w-full border-2 border-black bg-white group-hover:bg-black'></span>
      <span className='relative text-black group-hover:text-white'>{name}</span>
    </a>
  );
};
