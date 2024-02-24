import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <main className="flex justify-center items-center w-full bg-gray-50 overflow-clip">
      <div className="select-none flex flex-col justify-start items-center w-full sm:w-[500px] overflow-y-scroll scrollbar-hide bg-white font-IBMPlexSansKRSemiBold">
        {children}
      </div>
    </main>
  );
}

export default Layout;
