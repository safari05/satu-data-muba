import { ContentDetailDesaCantik } from "../organisms";
const DetailDesaCantikScreen = ({ initialData, kuisioner }) => {
    console.log("DetailDesaCantikScreen");
    console.log("Kuisioner:", kuisioner);  // Ensure this is logged correctly
    console.log("Initial Data:", initialData); // Verify what is being passed
  
    return (
      <>
        <ContentDetailDesaCantik data={initialData} isKuisioner={kuisioner} />
      </>
    )
  }
  
  export default DetailDesaCantikScreen;
  