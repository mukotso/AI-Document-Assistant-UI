import { Grid, Box } from '@mui/material';
import React from 'react';
import Animate from '../components/common/Animate';
import UploadDocument from '../components/document/UploadDocument';
import DocumentStats from '../components/document/DocumentStatsSummary';

const DocumentsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ marginTop: 18 }}> 
              <Animate type="fade" delay={1.5} sx={{ height: "100%" }}>
                <UploadDocument />
              </Animate>
            </Box>
          </Grid>

          <Grid item xs={12} container justifyContent="center">
            <Animate delay={2.5}>
              <Grid item xs={12}>
                <DocumentStats />
              </Grid>
            </Animate>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentsPage;
