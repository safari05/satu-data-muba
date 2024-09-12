import React from 'react'
import { DetailDesaCantikScreen } from '@/components/screens';
import { detailDesaCantik } from '@/services/detailDesaCantikData'; 

export default async function Page({params}) {
  const data = await detailDesaCantik;
  return (
    <DetailDesaCantikScreen initialData={data} />
  )
}
