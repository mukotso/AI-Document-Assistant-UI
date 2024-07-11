import { Grid } from '@mui/material';
import React from 'react';
import Animate from '../components/common/Animate';
import DocumentPreview from '../components/document/DocumentPreview';

const DocumentPreviewPage = () => {
  return (
      <Grid item xs={12} lg={4}>
          <Grid item xs={12}>
            <Animate delay={1.5}>
              <DocumentPreview />
            </Animate>
          </Grid>     
    </Grid>
  );
};

export default DocumentPreviewPage;