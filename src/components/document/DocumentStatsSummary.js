import React from 'react';
import { Grid, Stack, Typography, colors } from '@mui/material';
import Animate from "../common/Animate";
import MPaper from '../common/MPaper';

const summaryData = [
  {
    title: "Total Uploaded",
    value: "71"
  },
  {
    title: "Approved Documents",
    value: "11"
  },
  {
    title: "Rejected Documents",
    value: "12"
  }
];

const DocumentStatsSummary = () => {
  return (
    <Grid container spacing={3}>
      {summaryData.map((summary, index) => (
        <Grid key={index} item xs={12} sm={6} lg={4}>
          <Animate type="fade" delay={(index + 1) / 3}>
            <MPaper
              sx={{
                height: '100px', 
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center', 
              }}
            >
              <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-between' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ flex: 1 }}>
                  {summary.value}
                </Typography>
                <Typography variant="body2" fontWeight="bold" color={colors.grey[600]} sx={{ flex: 1 }}>
                  {summary.title}
                </Typography>
              </Stack>
            </MPaper>
          </Animate>
        </Grid>
      ))}
    </Grid>
  );
};

export default DocumentStatsSummary;
