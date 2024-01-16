import React from "react";
import { Layout } from "antd";

import Link from "next/link";

import Image from "next/image";
import SideMenuUI from "../ui/SideMenuUI";
import { dashboardItems } from "@/helpers/dashboardItems";
import Logo from "../shared/Logo/Logo";

const { Sider } = Layout;

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  return (
    <Sider
      // collapsible
      // className="bg-primar text-primary"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={300}
      style={{
        overflow: "auto",
        height: "110vh",
        position: "sticky",
        // position: "fixed",
        overflowY: "auto",
        zIndex: 40,
        left: 0,
        top: 0,
        bottom: 0,
        padding: "12px ",
        // width: "70vw",
        background: "white",
        scrollBehavior: "smooth",
        backgroundColor: "white",
        // overflow: "auto",
        // height: "100vh",
        // position: "fixed",
        // left: 0,
        // top: 0,
        // bottom: 0,
      }}
    >
      {!collapsed ? (
        <section className="ml-3 text-3xl mt-0 flex gap-2 items-center">
          <Link
            href={"/"}
            className=" flex justify-center text-white rounded w-full font-bold pb-2 px-2"
          >
            {/* <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvnKSp_yZT4Q5ciyjFGH-rxPJwp2L42BWMuG5YeNJVg&s"
              }
              alt="logo"
              width={600}
              height={500}
              className=" w-[127px] h-[45px] "
            /> */}

            <Logo />
          </Link>
        </section>
      ) : (
       
        <Link href={"/"}>
          <Logo />
        </Link>
      )}

      <SideMenuUI
        data={{
          itemsData: dashboardItems(),
          mainCss: `bg-white font-oswald pt-[20px] text-[14px] ${
            collapsed || ""
          }`,
          menuCss:
            " text-slate-700 text-[18px] font-oswald my-[8px] text-[14px] hover:text-primary",
          subMenuCss: " hover:text-primary font-oswalds  text-[14px]",
        }}
      />
      {/* //! SIdeMenuUI is reusable MenuUI for showing layout sidebar UI with dropdown children */}
    </Sider>
  );
};

export default DashboardSidebar;
