import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { useAlert } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { topicResPayload, TopicType } from "@/models";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import dayjs from 'dayjs'
import { InsType } from "@/models/instructor";
const { RangePicker } = DatePicker;
interface DataType {
  id: number;
  key: string;
  description: string;
  instructors: string;
  update: string;
}


const ManageTopics = () => {
  const { mutate:mutateUpdate } = useSWRConfig();
  const {
    data: listInstructor,
    error: errorIns,
    mutate: Ins,
  } = useSWR<{data:InsType[]}>("/rest/instructors");
  const { data, error, mutate } = useSWR("/rest/topic", {
    fetcher: () => TopicApi.getTopic(), 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTopic, setIdTopic] = useState<string>("");
  const {
    data: topicDetail,
    error: errorDetail,
    mutate: mutateDetail,
  } = useSWR<{ data: TopicType }>(
    isModalOpen ? `/rest/topic/${idTopic}` : null,
  );



  const onChange = (value: string) => {
  };

  const onSearch = (value: string) => {
    TopicApi.searchTopic(value)
  };

  const showModal = (id: string) => {
    setIdTopic(id);
    setIsModalOpen(true)
  };

  useEffect(()=>{
    form.setFieldsValue({
      topicTitle: topicDetail?.data.description,
      date: [
        dayjs(topicDetail?.data.start_day),
        dayjs(topicDetail?.data.end_day),
      ],
      instructor: topicDetail?.data.instructors?.instructor_id,
      status: topicDetail?.data.status
    });
  },[topicDetail])

  const handleDelete = () => {
    const data = idTopic && TopicApi.deleteTopic(idTopic)
    mutateUpdate("/rest/topic", {
      fetcher: () => TopicApi.getTopic(), 
    })
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
            onClick={() => showModal(rec.key?.slice(1))}
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
  };

  const onFinish = async (values: any) => {
    let dateStart = new Date();
    let dateEnd = new Date();
    dateStart = values.date[0].$d;
    dateEnd = values.date[1].$d;
    const payload: topicResPayload = {
      id:Number(idTopic.slice(0)),
      start_day: dateStart,
      end_day: dateEnd,
      departments: {
        id: 1,
      },
      description: values.topicTitle,
      instructors: {
        id: Number(values.instructor.slice(2)),
      },
      status: values.status,
    };
    const data = await TopicApi.updateTopic(payload);
      if (data.status === 200) {
        setAlert({ type: "success", msg: "Cập nhật đề tài thành công!" });
      } else {
        setAlert({ type: "error", msg: "Cập nhật đề tài không thành công!" });
      }
      mutateUpdate("/rest/topic", {
        fetcher: () => TopicApi.getTopic(), 
      })
      mutateUpdate(`/rest/topic/${idTopic}`)
  };
  return (
    <div>
      {contextHolder}
      <Table
        dataSource={dataSource}
        className="border-2 border-solid border-t-0"
        columns={columns}
      ></Table>
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
              Save
            </Button>
            <Button className="" danger onClick={() => handleDelete()}>
              Delete
            </Button>
          </Space>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          labelWrap
          labelAlign="left"
          onFinish={onFinish}
          form={form}
          id="myForm"
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
              onChange={onChange}
              onSearch={onSearch}
              options={listInstructor&&listInstructor.data?.map((option) =>({
                value: option.instructor_id || '',
                label: option.name
              }))}
            />
          </Form.Item>
          <Form.Item required name="status" label="Trạng thái phê duyệt: ">
            <Radio.Group>
              <Radio value={0}>Không</Radio>
              <Radio value={1}>Có</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
ManageTopics.Layout = MainLayout;

export default ManageTopics;
