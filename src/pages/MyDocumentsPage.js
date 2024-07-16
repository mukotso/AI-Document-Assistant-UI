import { Grid, Box } from '@mui/material';
import React from 'react';
import Animate from '../components/common/Animate';
import MyDocument from '../components/document/MyDocument';

const DocumentsPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ marginTop: 18 }}> 
              <Animate type="fade" delay={0.8} sx={{ height: "100%" }}>
                <MyDocument />
              </Animate>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentsPage;
