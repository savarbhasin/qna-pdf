import { SquareX, CirclePlus } from 'lucide-react';

const PDFHandler = ({file, setFile}:{
    file: File | null
    setFile: (file: File | null) => void
}) => {

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {file ? (
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-md">
          <p className="text-gray-700 font-medium">{file.name}</p>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={()=>{
            setFile(null)
          }}>
            <SquareX size={18} />
          </button>
        </div>
      ) : (
        <label className=" text-black border-black border font-[550] flex gap-2 items-center py-2 px-4 rounded-md cursor-pointer">
            <CirclePlus size={24}/>
          <input
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept=".pdf"
          />
          Upload PDF
        </label>
      )}
    </div>
  );
};

export default PDFHandler;