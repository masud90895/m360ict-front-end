"use client";

import { Table } from "antd";

type ReusableTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};

const ReusableTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: ReusableTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};

export default ReusableTable;
