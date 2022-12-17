import axiosClient from "@/api_app/AxiosClient";
import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { useAlert } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { TopicType } from "@/models";
import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

interface DataType {
  id: number;
  key: string;
  description: string;
  instructors: string;
  register: string;
}

import useSWR, { useSWRConfig } from "swr";
const RegisterDoTopics = () => {
  const{ mutate: mutateUpdate } = useSWRConfig()
  const {setAlert, contextHolder} = useAlert()
  const { profile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTopic, setIdTopic] = useState<string>("");
  const [idTopicStudent, setIdTopicStudent] = useState<string>(profile?.data?.topicid);
  const [form] = Form.useForm();
  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Thời gian không được để trống!",
      },
    ],
  };
  const {
    data: dataTopic,
    error: errorTopic,
    mutate: mutateTopic,
  } = useSWR([`/rest/topic/${idTopicStudent?.slice(0)}`,1],{
    
    fetcher: ([url,key]) => axiosClient.get(url)});
  const {
    data: topicDetail,
    error: errorDetail,
    mutate: mutateDetail,
  } = useSWR<{ data: TopicType }>(
    isModalOpen ? `/rest/topic/${idTopic?.slice(1)}` : null,
  );
  const { data, error, mutate } = useSWR("/rest/topic", {
    fetcher: () => TopicApi.getTopic(),
  });
  const router = useRouter();
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
      width: "60%",
      render: (text, rec) => <Link href={`/ListTopic/${rec.key}`}>{text}</Link>,
    },
    {
      title: "GVHD",
      dataIndex: "instructors",
      key: "instructors",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "register",
      key: "register",
      width: "10%",
      render:(text,rec) =>(
        <Button className="my-button" onClick={()=>showModal(rec.key?.slice(0))}>Đăng ký</Button>
      )
    },
  ];
  
  let dataSource: readonly DataType[] | undefined = [];
  if (data?.data) {
    dataSource = data.data
      ?.filter((value) => value.status === 1)
      ?.map((value) => {
        return {
          id: value.id,
          key: value.topic_id,
          description: value.description || "Unknown",
          instructors: value.instructors?.name,
          register: value.topic_id,
        };
      });
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIdTopic(id);
    setIsModalOpen(true)
  };
  const onFinish = async (values: any) => {
    const payload = {
      status:1,
      topic:{
        id:Number(idTopic?.slice(1))
      },
      student:{
          id: Number(profile?.data?.user_id?.slice(2))
      }
    };

    const data = await TopicApi.registerDoTopics(payload);
      if (data.status === 200) {
        setAlert({ type: "success", msg: "Đăng ký đề tài thành công!" });
        setIdTopicStudent(idTopic.slice(1))
      } else {
        setAlert({ type: "error", msg: "Đăng ký đề tài không thành công!" });
      }
    setIsModalOpen(false);

  };
  useEffect(()=>{
    form.setFieldsValue({
      topicTitle: topicDetail?.data.description,
      date: [
        dayjs(topicDetail?.data.start_day),
        dayjs(topicDetail?.data.end_day),
      ],
      instructor: topicDetail?.data.instructors?.name,
    });
  },[topicDetail])

  return (
    <div>
      {contextHolder}
      <div>
        <div className=" h-14 border-2 text-lg border-solid rounded-t-xl flex items-center p-5">
          DANH SÁCH ĐỀ TÀI
        </div>
        <Table
          dataSource={dataSource}
          className="border-2 border-solid border-t-0"
          columns={columns}
        ></Table>
      </div>
      <div>
        <div className=" h-14 border-2 text-lg border-solid rounded-t-xl flex items-center mt-4 p-5">
          ĐỀ TÀI SINH VIÊN ĐÃ ĐĂNG KÝ
        </div>
        <ul className="text-lg border-2 border-solid border-t-0 text-blue-500 ">
          <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">Tên đề tài</div>
            <div className="p-4 text-left w-1/2">{dataTopic?.data.description}</div>
          </li>
          <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">Khoa</div>
            <div className="p-4 text-left w-1/2">
              {dataTopic?.data.departments?.name}
            </div>
          </li>
          {/* <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">
              Sinh viên thực hiện
            </div>
            <div className="p-4 text-left w-1/2">
              {dataTopic?.data?.students
                ?.map((value: any) => value.name)
                .join(", ")}
            </div>
          </li> */}
          <li className="flex justify-between border-b-2 bg-green-200">
            <div className="w-1/2 border-r-2 border-solid p-4">
              Giáo viên hướng dẫn
            </div>
            <div className="p-4 text-left w-1/2">
              {dataTopic?.data.instructors?.name}
            </div>
          </li>
          <li className="flex justify-between border-b-2 bg-yellow-200">
            <div className="w-1/2 border-r-2 border-solid p-4 ">
              Giáo viên phản biện
            </div>
            <div className="p-4 text-left w-1/2">
              {dataTopic?.data.instructors?.name }
            </div>
          </li>
        </ul>
      </div>

      {/* MODAL */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        width="60vw"
        onCancel={handleCancel}
        footer={
          <Space>
            <Button
              className="my-button"
              form="myForm" key="submit" htmlType="submit"
            >
              Xác nhận
            </Button>
          </Space>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          labelWrap
          labelAlign="left"
          form={form}
          id="myForm"
          disabled
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên đề tài: "
            name="topicTitle"
            rules={[
              { required: true, message: "Tên đề tài không được để trống!" },
            ]}
          >
            <Input placeholder="Tiêu đê..." />
          </Form.Item>
          <Form.Item
            name="date"
            label="Bắt đầu - Kết thúc"
            className=" whitespace-normal"
            {...rangeConfig}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item label="Giảng viên hướng dẫn:" required name="instructor">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};
RegisterDoTopics.Layout = MainLayout;
export default RegisterDoTopics;
