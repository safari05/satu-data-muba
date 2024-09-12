import React from 'react'
import { DetailDesaCantikScreen } from '@/components/screens';
import { detailDesaCantik } from '@/services/detailDesaCantikData'; 
import datasetService from '@/services/dataset.service';

export default async function Page({params}) {
  const slugArray = params.slug; // This will be an array of path segments

  // Example: Extract values from the array
  const [kode, isKuisioner] = slugArray;

  const detailDesaCantikData = await datasetService.getOneSubData(isKuisioner, kode);

  return (
    <>
      <DetailDesaCantikScreen initialData={detailDesaCantikData} kuisioner={isKuisioner} />
      
    </>
  )
}
