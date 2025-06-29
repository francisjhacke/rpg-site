import React from "react";

const SiteHeader: React.FC<{ subtitle?: string }> = ({ subtitle }) => (
  <header className="w-full flex flex-col items-center justify-center text-center mb-6">
    <h1 className="text-3xl font-bold mb-2 text-gray-900">me.rpg</h1>
    {subtitle && <p className="text-gray-600 mb-6 text-center">{subtitle}</p>}
  </header>
);

export default SiteHeader;
