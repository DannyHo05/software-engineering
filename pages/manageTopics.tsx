import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/lib/table';
import React from "react";
import useSWR from "swr";
interface DataType {
  id: number;
  key: string;
  description: string;
  instructors: string;
  update: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên đề tài",
    dataIndex: "description",
    key: "description",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "GVHD",
    dataIndex: "instructors",
    key: "instructors",
  },
  {
    title: "Cập nhật",
    dataIndex: "update",
    align:'center',
    key: "update",
    render: (text) => (
      <div className="flex justify-center">
        <Button type="primary" icon={<EditOutlined />} className=" bg-blue-600 w-[50px] flex justify-center items-center ">
        </Button>
      </div>
    ),
  },
];
const ManageTopics = () => {
  const { data, error, mutate } = useSWR("/rest/topic", {
    fetcher: () => TopicApi.getTopic(),
  });

  let dataSource: readonly DataType[] | undefined = [];
  if (data?.data) {
    dataSource = data.data.map((value) => {
      return {
        id: value.id,
        key: value.topic_id,
        description: value.description || "Unknown",
        instructors: value.instructors?.name,
        update: value.topic_id,
      };
    });
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        className="border-2 border-solid border-t-0"
        columns={columns}
      ></Table>
    </div>
  );
};

ManageTopics.Layout = MainLayout;

export default ManageTopics;
