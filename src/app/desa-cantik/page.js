import React from 'react'
import { DesaCantikScreen } from '@/components/screens';
import {dataDesaCantik} from '@/services/desaCantikData';

export default async function DesaCantik() {
  const getDataDesaCantik = await dataDesaCantik;  
  return (
    <DesaCantikScreen initialData={getDataDesaCantik}/>
  )
}
  