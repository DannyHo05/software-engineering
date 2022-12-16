import { TopicApi } from '@/api_app/TopicApi';
import { MainLayout } from '@/components/layout'
import Table, { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
interface DataType {
    id:number;
    key: string;
    description: string;
    instructors:string;
  }

  import useSWR from 'swr'
  
const RegisterDoTopics = () => {
    const {data, error, mutate} = useSWR('/rest/topic',{
        fetcher:()=>TopicApi.getTopic()
      })
      const router= useRouter()
      const columns: ColumnsType<DataType> = [
        {
          title:'STT',
          dataIndex: 'id',
          key: 'id',
          width:"10%",
        },
        {
          title: 'Tên đề tài',
          dataIndex: 'description',
          key: 'description',
          width:"60%",
          render: (text, rec) => <Link href={`/ListTopic/${rec.key}`}>{text}</Link>,
        },
        {
          title: 'GVHD',
          dataIndex: 'instructors',
          key: 'instructors',
          width: '30%',
        },
      ];
      let dataSource: readonly DataType[] | undefined = []
      if(data?.data){
        dataSource = data.data.filter(value=>value.status==1).map(value=>{
          return {
            id: value.id,
            key: value.topic_id,
            description: value.description||'Unknown',
            instructors: value.instructors?.name
          }
        })
      }
        
      return (
        <div>
          <div className=' h-14 border-2 text-lg border-solid rounded-t-xl flex items-center p-5'>
            DANH SÁCH ĐỀ TÀI
          </div>
          <Table dataSource={dataSource} className='border-2 border-solid border-t-0' columns={columns} ></Table>
        </div>
      )
    }
RegisterDoTopics.Layout = MainLayout
export default RegisterDoTopics