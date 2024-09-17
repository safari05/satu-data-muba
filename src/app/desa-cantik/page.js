import React from 'react'
import { DesaCantikScreen } from '@/components/screens';
import {dataDesaCantik} from '@/services/desaCantikData';
import datasetService from '@/services/dataset.service';

export default async function DesaCantik() {
  const getDataDesaCantik = await datasetService.getOneData();
  return (
    <DesaCantikScreen initialData={getDataDesaCantik}/>
  )
}
  