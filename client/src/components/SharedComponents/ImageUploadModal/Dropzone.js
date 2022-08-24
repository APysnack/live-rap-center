import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropzoneWrapper } from './ImageUploadModal.styles';

function Dropzone({ open, onSubmit }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      onSubmit(file);
    });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({ onDrop, accept: { 'image/png': ['.png', '.jpeg'] } });

  return (
    <DropzoneWrapper {...getRootProps({ className: 'dropzone' })}>
      <input className='input-zone' {...getInputProps()} />
      <div className='text-center'>
        <div className='dropzone-content'>
          {isDragActive
            ? 'Release to drop the files here'
            : 'Drag and drop files here, or click to select files'}
        </div>
      </div>
      {acceptedFiles?.length > 0
        ? acceptedFiles.map((file) => (
            <div key={file.path}>
              {file.path} - {file.size} bytes
            </div>
          ))
        : null}
      <button type='button' onClick={open} className='btn'>
        Click to select files
      </button>
    </DropzoneWrapper>
  );
}

export default Dropzone;
