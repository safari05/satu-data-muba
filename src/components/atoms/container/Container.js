import React from "react";

export const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto md:px-8 px-4 2xl:px-28 ${className}`}>
      {children}
    </div>
  );
};
