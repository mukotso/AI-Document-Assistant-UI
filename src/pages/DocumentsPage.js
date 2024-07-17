import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import Animate from '../components/common/Animate';
import UploadDocument from '../components/document/UploadDocument';
import DocumentStats from '../components/document/DocumentStatsSummary';

const DocumentsPage = () => {
  const [documentStats, setDocumentStats] = useState({ total: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8022/api/documents/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDocumentStats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ marginTop: 18 }}> 
              <Animate type="fade" delay={0.7} sx={{ height: '100%' }}>
                <UploadDocument />
              </Animate>
            </Box>
          </Grid>

          <Grid item xs={12} container justifyContent="center">
            <Animate delay={2.5}>
              <Grid item xs={12}>
                <DocumentStats data={documentStats} />
              </Grid>
            </Animate>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentsPage;
