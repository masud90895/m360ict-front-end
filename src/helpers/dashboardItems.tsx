import type { MenuProps } from "antd";
import { PicRightOutlined, UserSwitchOutlined } from "@ant-design/icons";

export const dashboardItems = () => {
  // ! common sidebar for every user
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <button className="bg-red-60">Dashboard</button>,
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
      label: <button className="bg-red-60">Users</button>,
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
