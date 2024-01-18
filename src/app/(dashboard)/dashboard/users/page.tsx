"use client";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Button, Col, Input, Row, message } from "antd";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import ReusableTable from "@/components/ui/ReusableTable";
import Form from "@/components/Forms/Forms";
import ModalForm from "@/components/modal/ModalForm";
import ActionBar from "@/components/ui/ActionBar";
import ReusableBreadCrumb from "@/components/ui/ReusableBreadCrumb";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/userApi/userApi";
import InputField from "@/components/Forms/InputField";
import config from "@/config";

const UserList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  // get data
  const { data, isLoading } = useGetAllUsersQuery(searchTerm);
  const filteredData = data?.filter(
    (item: any) => item?.profile?.role === "USER"
  );

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  // handle edit

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const handleEdit = async (data: any) => {
    const updateData = {
      email: data?.email,
      firstName: data?.profile?.firstName,
      lastName: data?.profile?.lastName,
      profileImage: data?.profileImage ?? editData?.profile?.profileImage,
      contactNumber: data?.profile?.contactNumber,
      address: data?.profile?.address,
      bloodGroup: data?.profile?.bloodGroup,
      role: data?.profile?.role,
    };

    const id = data?.profile?.profileId;

    try {
      const res = await updateUser({ id, body: updateData }).unwrap();

      if (res?.success) {
        message.success("Admin updated successfully");
        setIsEditModalOpen(false);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };

  // handle edit end

  // delete
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Please confirm your action!",
      async onOk() {
        try {
          const res: any = await deleteUser(id);

          if (res?.data?.success) {
            message.success("User Deleted successfully");
          }
        } catch (err: any) {
          console.error(err.data?.message);
          message.error(err.data?.message);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // delete end

  const columns = [
    {
      title: "Full Name",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.lastName}`;
        return <div className="flex gap-2 items-center">{fullName}</div>;
      },
      //   sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      //   sorter: true,
    },
    {
      title: "Role",
      dataIndex: "profile",
      render: function (data: Record<string, string>) {
        return <>{data?.role ?? "-"}</>;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      //   sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => {
                setIsEditModalOpen(true);
                setEditData(data);
              }}
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => deleteHandler(data?.userId)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  //   console.log(dataSource);

  return (
    <>
      <div className="container rounded bg-white mt-1 mb-5 p-4">
        <ReusableBreadCrumb
          items={[
            {
              label: "dashboard",
              link: "/dashboard",
            },
            {
              label: "user-lists",
              link: "/dashboard/users",
            },
          ]}
        />

        <div className="mt-5">
          <ActionBar title="User Lists">
            <Input
              type="text"
              size="large"
              placeholder="Search by name, email, role..."
              style={{
                width: "30%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              {(!!sortBy || !!sortOrder || !!searchTerm) && (
                <Button
                  onClick={resetFilters}
                  type="primary"
                  style={{ margin: "0px 5px" }}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>
        </div>

        <ReusableTable
          loading={isLoading}
          columns={columns}
          dataSource={filteredData}
          pageSize={size}
          // totalPages="meta?.total"
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
      {isEditModalOpen && editData && (
        <ModalForm
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          title="User List"
          isLoading={updateLoading}
        >
          <Form submitHandler={handleEdit} defaultValues={editData}>
            {/* faculty information */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "5px 0px",
                }}
              >
                Profile information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    disabled
                    required
                  />
                </Col>
              </Row>
            </div>
            {/* basic information  */}
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  margin: "5px 0px",
                }}
              >
                Basic information
              </p>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <InputField
                    name="profile.firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    required
                  />
                </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                  <InputField
                    name="profile.lastName"
                    label="Last Name."
                    placeholder="Enter Last Name"
                    required
                  />
                </Col>{" "}
              </Row>
            </div>

            <div className="flex gap-5">
              <Button
                htmlType="submit"
                loading={updateLoading}
                disabled={updateLoading}
              >
                Update User
              </Button>

              <Button
                onClick={() => setIsEditModalOpen(false)}
                htmlType="button"
                type="primary"
                danger
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalForm>
      )}
    </>
  );
};

export default UserList;
