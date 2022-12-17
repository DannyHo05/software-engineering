import { MainLayout } from "@/components/layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { is } from "immer/dist/internal";
import router, { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const DetailTopic = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(`/rest/topic/${id?.slice(1)}`);
  if (error) router.replace("/ListTopic");
  return (
    <div>
        <ArrowLeftOutlined className="text-xl p-4 pt- pl-0 cursor-pointer" onClick={()=>router.replace("/ListTopic")} />
      <div className=" h-14 border-2 border-solid text-xl rounded-t-xl flex items-center p-5">
        CHI TIẾT ĐỀ TÀI
      </div>
      <ul className="text-lg border-2 border-solid border-t-0 text-blue-500 ">
        <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">Tên đề tài</div>
            <div className="p-4 text-left w-1/2">{data?.data.description}</div>
        </li>
        <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">Khoa</div>
            <div className="p-4 text-left w-1/2">{data?.data.departments.name}</div>
        </li>
        <li className="flex justify-between border-b-2">
            <div className="w-1/2 border-r-2 border-solid p-4">Sinh viên thực hiện</div>
            <div className="p-4 text-left w-1/2">{data?.data.students?.map((value:any)=>value.name).join(', ') || 'Chưa có sinh viên thực hiện'}</div>
        </li>
        <li className="flex justify-between border-b-2 bg-green-200">
            <div className="w-1/2 border-r-2 border-solid p-4">Giáo viên hướng dẫn</div>
            <div className="p-4 text-left w-1/2">{data?.data.instructors.name || 'Chưa có giáo viên hướng dẫn'}</div>
        </li>
        <li className="flex justify-between border-b-2 bg-yellow-200">
            <div className="w-1/2 border-r-2 border-solid p-4 ">Giáo viên phản biện</div>
            <div className="p-4 text-left w-1/2">{data?.data.instructors.name || 'Chưa có giáo viên phản biện'}</div>
        </li>
      </ul>
    </div>
  );
};

DetailTopic.Layout = MainLayout;

export default DetailTopic;
