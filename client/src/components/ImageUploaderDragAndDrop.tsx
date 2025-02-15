import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onFileSelect: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] }, // Accept only image files
    onDrop: (acceptedFiles) => onFileSelect(acceptedFiles),
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 text-center"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600 text-sm">
        Drag & drop an image here, or click to select one
      </p>
    </div>
  );
};

export default ImageUpload;
