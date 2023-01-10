import React from 'react'

const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (false) // verifier si json
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        onFileSelectSuccess(JSON.parse(reader.result));
      };
    };
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileInput} />
    </div>
  );
}

export default FileUploader;
