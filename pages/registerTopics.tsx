import { TopicApi } from "@/api_app/TopicApi";
import { MainLayout } from "@/components/layout";
import { useAlert } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import { topicResPayload } from "@/models";
import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import { type } from "os";
import React from "react";
const { RangePicker } = DatePicker;
const registerTopics = () => {
  const { profile } = useAuth();
  const [form] = Form.useForm();
  let topicTitle = Form.useWatch("topicTitle", form);
  const insId = profile?.data.user_id;
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
    console.log(dateStart.toISOString());
    const payload: topicResPayload = {
      start_day: dateStart,
      end_day: dateEnd,
      departments: {
        id: 1,
      },
      description: values.topicTitle,
      instructors: {
        id: Number(profile.data.user_id.slice(2)),
      },
      status: 0,
    };
    const data = await TopicApi.registerTopics(payload);
    if (data.status === 200) {
      form.resetFields();
      setAlert({ type: "success", msg: "Đăng ký đề tài thành công!" });
    } else {
      setAlert({ type: "error", msg: "Đăng ký đề tài không thành công!" });
    }
  };

  return (
    <div className="flex flex-col justify-center">
      {contextHolder}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        labelWrap
        labelAlign="left"
        onFinish={onFinish}
        form = {form}
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
        <Form.Item required label="Giảng viên hướng dẫn:">
          <Input value={profile?.data.name} disabled />
        </Form.Item>
        <Form.Item className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-blue-600 w-1/3 flex justify-center"
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

registerTopics.Layout = MainLayout;

export default registerTopics;
