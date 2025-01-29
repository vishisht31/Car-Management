
import { useRef } from "react"



const FileUpload = ({ onFileSelect, multiple = false }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const files = event.target.files
    if (files && files.length > 0) {
      onFileSelect(files)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      onFileSelect(files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple={multiple}
        accept="image/*"
      />
      <p className="text-gray-400">Drag and drop images here, or click to select files</p>
      <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG, GIF</p>
    </div>
  )
}

export default FileUpload

