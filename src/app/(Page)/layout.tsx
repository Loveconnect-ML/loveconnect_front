import React from "react";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="pb-[10%] flex flex-col justify-start items-center w-full sm:w-[500px] h-full bg-white overflow-y-scroll">
        {children}
      </div>
    </main>
  );
}

export default Layout;
