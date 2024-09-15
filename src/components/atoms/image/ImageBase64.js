export const ImageBase64 = ({base64String , altInfo, format = 'png' }) => {
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    return (
        <img
        src={`data:${mimeType};base64,${base64String}`}
        alt={altInfo}
         className="w-[100px] h-[100px] object-contain rounded-md mb-3 bg-transparent p-2
        transition duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6"
      />
    )
}