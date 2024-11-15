import React from 'react'
import PDFHandler from './PDFHandler'

const Navbar = ({file,setFile}:{
    file: File | null
    setFile: (file: File | null) => void
}) => {
  return (
    <div className="w-full h-16 sm:h-20 flex items-center justify-between px-4 sm:px-10 lg:px-20 shadow-md bg-white text-black">
      <img
        src="https://photos.wellfound.com/startups/i/7833886-8845748fdd8c717d5b9e03192d3e0756-medium_jpg.jpg?buster=1669391539"
        alt="logo"
        className="w-16 h-auto sm:w-20"
      />
      <PDFHandler file={file} setFile={setFile} />
    </div>

  )
}

export default Navbar