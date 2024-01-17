"use client";

import { Drawer, Layout, message } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SideMenuUI from "@/components/ui/SideMenuUI";
import { dashboardItems } from "@/helpers/dashboardItems";
import DashboardSidebar from "@/components/dashboard/DashboardSider";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const { Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const screens = useBreakpoint();
 


  return (
    <Layout
      hasSider
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {/*//! for Large device drawer */}
      {!screens.sm || !screens.md ? (
        <Drawer
          title={`Admin Dash`}
          placement="left"
          onClose={() => setCollapsed(false)}
          open={collapsed}
        >
          <SideMenuUI
            data={{
              itemsData: dashboardItems(),
              mainCss: "bg-white",
              menuCss: "bg-slate-50 text-primary my-5 font-[600]",
              subMenuCss: "hover:bg-primary hover:text-white",
            }}
          />
          {/* //! SIdeMenuUI is reusable MenuUI for showing layout sidebar UI with dropdown children */}
        </Drawer>
      ) : (
        <section>
          {/*//! for small & medium device drawer */}
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </section>
      )}
      {/* //! Main Content of dashboard with dashboard navbar */}
      <Layout style={{ overflow: "hidden" }}>
        <DashboardNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            padding: "1em",
            minHeight: "100vh",
            overflowY: "initial",
          }}
        >
          <div className="bg-white rounded p-4">{children}</div>
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
