import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Spin } from 'antd'
import Cookies from 'js-cookie'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(()=>{
    if(Cookies.get('token')) router.replace('/home')
    else router.replace('/auth/login')
  },[])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>UTE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spin size="large"/>
    </div>
  )
}

export default Home
