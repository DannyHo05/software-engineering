import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { Button } from "antd";
import Table from "antd/lib/table";
import type { ColumnsType } from "antd/lib/table";
import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
const { Column, ColumnGroup } = Table;
interface DataType {
  id: number;
  key: string;
  description: string;
  instructors: string;
  approve: string;
}

const ApproveTopics = () => {
  const { mutate: mutateUpdate } = useSWRConfig();
  const { data, error, mutate } = useSWR("/rest/topic", {
    fetcher: () => TopicApi.getTopic(),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Tên đề tài",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
      width: "45%",
    },
    {
      title: "GVHD",
      dataIndex: "instructors",
      key: "instructors",
      width: "25%",
    },
    {
      title: "Phê duyệt",
      dataIndex: "approve",
      align: "center",
      key: "approve",
      render: (text, rec) => (
        <div className="flex justify-center">
          <Button
            type="primary"
            className=" bg-blue-600 w-[80px] flex justify-center items-center "
            onClick={() => {
              TopicApi.changeStatus({
                status: 1,
                id: Number(rec.key.slice(1)),
              });
              const newArr = data;
              mutateUpdate("/rest/topic",{
                fetcher: () => TopicApi.getTopic(),
              });
            }}
          >
            Phê duyệt
          </Button>
          <Button
            danger
            type="text"
            className=" w-[50px] flex justify-center items-center ml-2"
            onClick={async () => {
              await TopicApi.changeStatus({
                status: 4,
                id: Number(rec.key?.slice(1)),
              });
              mutateUpdate("/rest/topic",{
                fetcher: () => TopicApi.getTopic(),
              });
            }}
          >
            Hủy
          </Button>
        </div>
      ),
      width: "20%",
    },
  ];

  let dataSource: readonly DataType[] | undefined = [];
  useEffect(() => {
    if (data?.data) {
      dataSource = data.data
        .filter((value) => {
          return value.status === 0;
        })
        .map((value, index) => {
          return {
            id: index + 1,
            key: value.topic_id,
            description: value.description || "Unknown",
            instructors: value.instructors?.name,
            approve: value.topic_id,
          };
        });
    }
  }, [data])
  
  if (data?.data) {
    dataSource = data.data
      .filter((value) => {
        return value.status === 0;
      })
      .map((value, index) => {
        return {
          id: index + 1,
          key: value.topic_id,
          description: value.description || "Unknown",
          instructors: value.instructors?.name,
          approve: value.topic_id,
        };
      });
  }
  
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">PHÊ DUYỆT ĐỀ TÀI</h1>
      <Table
        dataSource={dataSource}
        className="border-2 border-solid border-t-0"
        columns={columns}
      ></Table>
    </div>
  );
};

ApproveTopics.Layout = MainLayout;

export default ApproveTopics;
