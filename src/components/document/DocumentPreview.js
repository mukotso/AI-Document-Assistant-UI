import React from 'react';
import { Box, Grid, Stack, Button, Typography } from '@mui/material';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import MPaper from '../common/MPaper';
import { images } from '../../assets';

const DocumentPreview = ({ documents = [] }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Approve
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MPaper title="Original Document" >
            <Stack spacing={3}>
              {/* Booking info */}
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
              {/* Booking info */}

              {/* Image */}
              <Box sx={{
                pt: '100%',
                position: 'relative',
                '& img': {
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: '100%',
                  borderRadius: 8,
                }
              }}>
                <img src={images.bookingImage} alt="booking" />
              </Box>
              {/* Image */}
            </Stack>
          </MPaper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MPaper title="Improved Document">
            <Stack spacing={3}>
              {/* Booking info */}
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
              {/* Booking info */}

              {/* Image */}
              <Box sx={{
                pt: '100%',
                position: 'relative',
                '& img': {
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: '100%',
                  borderRadius: 8,
                }
              }}>
                <img src={images.logo} alt="booking" />
              </Box>
              {/* Image */}
            </Stack>
          </MPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentPreview;








