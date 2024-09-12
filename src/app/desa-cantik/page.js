import React from 'react'
import { DesaCantikScreen } from '@/components/screens';
import {dataDesaCantik} from '@/services/desaCantikData';
import datasetService from '@/services/dataset.service';

export default async function DesaCantik() {
  const getDataDesaCantik = await dataDesaCantik;  
  const jsonPlaceholder = await datasetService.getOneData();  
  console.log(jsonPlaceholder);

  return (
    <DesaCantikScreen initialData={getDataDesaCantik}/>
  )
}
  