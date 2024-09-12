import React from 'react'
import { DetailDesaCantikScreen } from '@/components/screens';
import { detailDesaCantik } from '@/services/detailDesaCantikData'; 

export default async function Page({params}) {
  const slugArray = params.slug; // This will be an array of path segments

  // Log parameters to debug
  console.log('Slug Array:', slugArray);

  // Example: Extract values from the array
  const [kode, isKuisioner] = slugArray;
  console.log(`kode ${kode}`)
  console.log(`isKuisioner ${isKuisioner}`)
  const data = await detailDesaCantik;
  return (
    <DetailDesaCantikScreen initialData={data} />
  )
}
