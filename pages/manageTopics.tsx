import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { useAlert } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { topicResPayload, TopicType } from "@/models";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import moment from 'moment';
import dayjs from 'dayjs';
import useSWR from "swr";
const { RangePicker } = DatePicker;
interface DataType {
  id: number;
  key: string;
  description: string;
  instructors: string;
  update: string;
}

const ManageTopics = () => {
  const { data, error, mutate } = useSWR("/rest/topic", {
    fetcher: () => TopicApi.getTopic(),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTopic, setIdTopic] = useState<number | string>("");
  const {
    data: topicDetail,
    error: errorDetail,
    mutate: mutateDetail,
  } = useSWR<{data:TopicType}>(!isModalOpen ? `/rest/topic/${idTopic}` : null);

  const showModal = async (id: number | string) => {
    setIdTopic(id);
    setIsModalOpen(true);
    console.log(topicDetail);
    console.log(moment(topicDetail?.data.start_day));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      align: "center",
      key: "update",
      render: (text, rec) => (
        <div className="flex justify-center">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(rec.key.slice(1))}
            className=" bg-blue-600 w-[50px] flex justify-center items-center "
          ></Button>
        </div>
      ),
    },
  ];

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
  const [form] = Form.useForm();
  // let topicTitle = Form.useWatch("topicTitle", form);
  const onFormLayoutChange = () => {};
  const { setAlert, contextHolder } = useAlert();
  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Thời gian không được để trống!",
      },
    ],
  }
  
  const onFinish = async (values: any) => {
    let dateStart = new Date();
    let dateEnd = new Date();
    dateStart = values.date[0].$d;
    dateEnd = values.date[1].$d;
    console.log(dateStart.toISOString());
    // const payload: topicResPayload = {
    //   start_day: dateStart,
    //   end_day: dateEnd,
    //   departments: {
    //     id: 1,
    //   },
    //   description: values.topicTitle,
    //   instructors: {
    //     // id: Number(profile.data.user_id.slice(2)),
    //   },
    //   status: 0,
    // };
    // const data = await TopicApi.registerTopics(payload);
    //   if (data.status === 200) {
    //     form.resetFields();
    //     setAlert({ type: "success", msg: "Đăng ký đề tài thành công!" });
    //   } else {
    //     setAlert({ type: "error", msg: "Đăng ký đề tài không thành công!" });
    //   }
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        className="border-2 border-solid border-t-0"
        columns={columns}
      ></Table>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        width="50vw"
        onCancel={handleCancel}
        footer={
          <Space>
            <Button className="my-button" onClick={() => handleOk()} htmlType="submit">
              Save
            </Button>
            <Button className="" danger onClick={() => handleOk()}>
              Delete
            </Button>
          </Space>
        }
      >
        <Form
          initialValues={
            {
              topicTitle: topicDetail?.data.description,
              date:[moment(topicDetail?.data.start_day), moment(topicDetail?.data.end_day)]
            }
          }
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            labelWrap
            labelAlign="left"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Tên đề tài: "
              name="topicTitle"
              rules={[
                { required: true, message: "Tên đề tài không được để trống!" },
              ]}
            >
              <Input placeholder="Tiêu đê..."/>
            </Form.Item>
            <Form.Item
              name="date"
              label="Bắt đầu - Kết thúc"
              className=" whitespace-normal"
              {...rangeConfig}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item required label="Giảng viên hướng dẫn:">
              <Input />
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};
ManageTopics.Layout = MainLayout;

export default ManageTopics;
