import React from "react";
import Header from "../components/Header";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default BaseLayout;
