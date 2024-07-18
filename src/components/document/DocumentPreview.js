import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Stack, Button, Typography, CircularProgress, Tooltip, Modal, IconButton, Backdrop } from '@mui/material';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MPaper from '../common/MPaper';
import InfoIcon from '@mui/icons-material/Info';

const DocumentPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { document } = location.state || {};
  const [improvedContent, setImprovedContent] = useState('');
  const [isImproved, setIsImproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  if (!document) {
    return <Typography>No document to display</Typography>;
  }

  const handleImprove = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
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
        setSuggestions(result.suggestions || []);
        setIsImproved(true);
        console.log("result after upload----->", result);
      } else {
        console.error('Error improving document:', response.statusText);
      }
    } catch (error) {
      console.error('Error improving document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8022/api/documents/${document.document_id}/update-status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Document ${status}`, result);
        if (status === 'approved') {
          navigate('/docs');
        }
      } else {
        console.error(`Error updating document status to ${status}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error updating document status to ${status}:`, error);
    }
  };

  const handleApprove = () => {
    handleUpdateStatus('approved');
  };

  // const handleReject = () => {
  //   handleUpdateStatus('rejected');
  // };

  const handleReject = async () => {
    await handleUpdateStatus('rejected');
    navigate('/documents');
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Stack direction="row" spacing={2}>
          {!isImproved ? (
            <Button variant="contained" color="success" onClick={handleImprove} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Improve'}
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
              

                {isImproved && (
                  <Box>
                    <Tooltip title="Click to view suggestions">
                      <IconButton onClick={handleOpenModal}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Modal
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="suggestions-modal-title"
                      aria-describedby="suggestions-modal-description"
                    >
                      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width:600, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                        <Typography id="suggestions-modal-title" variant="h6" component="h2">
                          Suggestions
                        </Typography>
                        <Box id="suggestions-modal-description" sx={{ mt: 2 }}>
                          {suggestions.length ? (
                            suggestions.map((suggestion, index) => (
                              <Typography key={index} variant="body2">
                                {suggestion}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2">No suggestions available</Typography>
                          )}
                        </Box>
                      </Box>
                    </Modal> */}

                    <Modal
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="suggestions-modal-title"
                      aria-describedby="suggestions-modal-description"
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                        style: {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(5px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 600,
                          bgcolor: 'background.paper',
                          border: 'none',
                          boxShadow: 24,
                          p: 4,
                          borderRadius: 2,
                        }}
                      >
                        <Typography id="suggestions-modal-title" variant="h6" component="h2" sx={{ mb: 2, color: '#1976d2' }}>
                          Suggestions
                        </Typography>
                        <Box id="suggestions-modal-description">
                          {suggestions.length ? (
                            suggestions.map((suggestion, index) => (
                              <Typography key={index} variant="body2" sx={{ mb: 1, color: '#555' }}>
                                {suggestion}
                              </Typography>
                            ))
                          ) : (
                            <Typography variant="body2" sx={{ color: '#888' }}>No suggestions available</Typography>
                          )}
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                )}
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



