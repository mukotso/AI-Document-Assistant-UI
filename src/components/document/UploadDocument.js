import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MPaper from '../common/MPaper';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';

const UploadDocument = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      toast.success(`${meta.name} uploaded successfully!`);
      handleSubmit([file]);
    } else if (status === 'error') {
      toast.error(`${meta.name} upload failed.`);
    }
  };

  const handleSubmit = async (files) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const responses = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);

          const response = await fetch('http://localhost:8022/api/upload/', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${token}`,
            },
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const result = await response.json();
          console.log("result after upload----->", result);
          setUploadedDocuments((prev) => [...prev, result]);

  
          navigate('/documents/uploads', { state: { document: result } });

          return result;
        })
      );
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept=".pdf,.docx,.txt"
              inputContent="Drag & Drop your documents or Click to Browse"
              styles={{
                dropzone: { border: '2px dashed #4a90e2', borderRadius: '10px', padding: '20px' },
                inputLabel: { color: '#4a90e2', fontWeight: 'bold' },
              }}
            />
          )}
        </Box>
      </Stack>
      <ToastContainer />
    </MPaper>
  );
};

export default UploadDocument;

