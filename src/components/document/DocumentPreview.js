import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Stack, Button, Typography } from '@mui/material';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MPaper from '../common/MPaper';

const DocumentPreview = () => {
  const location = useLocation();
  const { document } = location.state || {};
  const [improvedContent, setImprovedContent] = useState('');
  const [isImproved, setIsImproved] = useState(false);

  if (!document) {
    return <Typography>No document to display</Typography>;
  }

  const handleImprove = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8022/api/documents/${document.document_id}/improve/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setImprovedContent(result.improved_content);
        setIsImproved(true);
        console.log("result after upload----->", result);
      } else {
        console.error('Error improving document:', response.statusText);
      }
    } catch (error) {
      console.error('Error improving document:', error);
    }
  };

  const handleApprove = () => {

    console.log('Document approved');
  };

  const handleReject = () => {
   
    console.log('Document rejected');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Stack direction="row" spacing={2}>
          {!isImproved ? (
            <Button variant="contained" color="success" onClick={handleImprove}>
              Improve
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={handleApprove}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={handleReject}>
                Reject
              </Button>
            </>
          )}
        </Stack>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MPaper title="Original Document">
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={5} sx={{ color: 'textSecondary' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AspectRatioIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    Aspect ratio
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    Time
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                {document.content}
              </Box>
            </Stack>
          </MPaper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MPaper title="Improved Document">
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={5} sx={{ color: 'textSecondary' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AspectRatioIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    Aspect ratio
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    Time
                  </Typography>
                </Stack>
              </Stack>
              <Box>
                {improvedContent || <Typography variant="body2" fontWeight={600}>No improved content yet.</Typography>}
              </Box>
            </Stack>
          </MPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentPreview;
