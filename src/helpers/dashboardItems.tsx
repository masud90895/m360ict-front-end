import type { MenuProps } from "antd";
import { PicRightOutlined, UserSwitchOutlined } from "@ant-design/icons";
import Link from "next/link";

export const dashboardItems = () => {
  // ! common sidebar for every user
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <Link href={"/dashboard"} className="bg-red-60">
          Dashboard
        </Link>
      ),

      key: "dashboard",
      icon: (
        <PicRightOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
    },
    {
      label: (
        <Link href={"/dashboard/users"} className="bg-red-60">
          Users
        </Link>
      ),
      key: "users",
      icon: (
        <UserSwitchOutlined
          style={{
            fontSize: "18px",
          }}
        />
      ),
    },
  ];

  return defaultSidebarItems;
};
