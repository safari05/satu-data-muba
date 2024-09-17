import { ContentDetailDesaCantik } from "../organisms";
const DetailDesaCantikScreen = ({ initialData, kuisioner }) => {
  
    return (
      <>
        <ContentDetailDesaCantik data={initialData} isKuisioner={kuisioner} />
      </>
    )
  }
  
  export default DetailDesaCantikScreen;
  