import React, { useEffect, useState } from 'react';
import { images } from "../../assets";
import { Box, Grid, Stack, Typography, colors } from '@mui/material';
import Animate from "./Animate";
import MPaper from './MPaper';

const SummaryGrid = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_uploaded_documents: 0,
    total_approved_documents: 0,
    total_rejected_documents: 0,
    total_documents: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8022/api/get_statistics/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const summaryData = [
    {
      title: "Total Users",
      value: stats.total_users,
      image: images.summaryImages.users
    },
    {
      title: "Total Uploaded Documents",
      value: stats.total_uploaded_documents,
      image: images.summaryImages.upload
    },
    {
      title: "Total Approved Documents",
      value: stats.total_approved_documents,
      image: images.summaryImages.approved
    },
    {
      title: "Total Rejected Documents",
      value: stats.total_rejected_documents,
      image: images.summaryImages.cancel
    },
    {
      title: "Total Downloads",
      value: stats.total_documents,
      image: images.summaryImages.download
    }
  ];

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" sx={{ color: 'green' }} gutterBottom>
        Welcome to the AI Document Assistant Dashboard!
      </Typography>
      <Typography variant="body1" color={colors.grey[800]} paragraph>
        Your ultimate tool for reviewing and improving document contents. Below is a quick overview of our system's performance:
      </Typography>
      <Typography variant="body1" color={colors.grey[800]} paragraph>
        From user engagement to document approvals, get insights at a glance and stay updated with real-time data.
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((summary, index) => (
          <Grid key={index} item xs={12} lg={4}>
            <Animate type="fade" delay={(index + 1) / 3}>
              <MPaper>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack spacing={1}>
                    <Typography variant="h4" fontWeight="bold">
                      {summary.value}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color={colors.grey[600]}>
                      {summary.title}
                    </Typography>
                  </Stack>
                  <Box sx={{
                    height: "100px",
                    width: "100px",
                    "& img": { width: "100%" }
                  }}>
                    <img src={summary.image} alt="summary" />
                  </Box>
                </Stack>
              </MPaper>
            </Animate>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SummaryGrid;
