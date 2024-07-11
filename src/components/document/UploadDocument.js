import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MPaper from '../common/MPaper';
import { Box, Stack, Typography } from '@mui/material';
import DocumentPreview from './DocumentPreview'; 

const UploadDocument = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const navigate = useNavigate(); 

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    if (status === 'done') {
      toast.success(`${meta.name} uploaded successfully!`);
    } else if (status === 'error') {
      toast.error(`${meta.name} upload failed.`);
    }
  };

  const handleSubmit = async (files, allFiles) => {
    try {
      const responses = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file.file);

          const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          return response.json();
        })
      );

      const newDocuments = responses.map((res) => ({
        name: res.originalName, 
        originalUrl: res.originalUrl,
        improvedUrl: res.improvedUrl, 
      }));

      setUploadedDocuments(newDocuments);
      navigate('/documents/uploads'); 

    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      allFiles.forEach((f) => f.remove());
    }
  };

  return (
    <MPaper title="Upload Document">
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography variant="body2">
            Drag & Drop your documents or Click to Browse
          </Typography>
        </Stack>
        <Box>
          <Dropzone
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept=".pdf,.docx"
            inputContent="Drag & Drop your documents or Click to Browse"
            styles={{
              dropzone: { border: '2px dashed #4a90e2', borderRadius: '10px', padding: '20px' },
              inputLabel: { color: '#4a90e2', fontWeight: 'bold' },
            }}
          />
        </Box>
        {uploadedDocuments.length > 0 && (
          <DocumentPreview documents={uploadedDocuments} />
        )}
      </Stack>
      <ToastContainer />
    </MPaper>
  );
};

export default UploadDocument;
