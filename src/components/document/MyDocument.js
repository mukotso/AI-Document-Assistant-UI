import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { saveAs } from 'file-saver';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa'; // Import correct icons from react-icons

import {  Download as DownloadIcon } from '@mui/icons-material';


const MyDocument = () => {
  const [rows, setRows] = useState([]);
  const [downloading, setDownloading] = useState(false);

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
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = dayjs(dateString).locale('en-gb');
    return date.format('D MMMM YYYY h:mm A'); // e.g., 16th July 2024 5:41 PM
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) {
      return <FaFilePdf style={{ color: 'red', marginRight: 8 }} />;
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      return <FaFileWord style={{ color: '#2b579a', marginRight: 8 }} />;
    } else if (fileName.endsWith('.txt')) {
      return <FaFileAlt style={{ color: 'gray', marginRight: 8 }} />; 
    } else {
      return <FaFileAlt style={{ color: 'gray', marginRight: 8 }} />;
    }
  };

  const handleDownload = async (id, fileName) => {
    setDownloading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8022/api/documents/${id}/generate_word_document/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      saveAs(blob, `${fileName}_optimized.docx`);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ backgroundColor: 'green' }}>
          <TableCell sx={{ color: 'white' }}>File Name</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>Upload Date</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>Status</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.document_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
           <span style={{ fontSize: '20px' }}>{getFileIcon(row.file_name)}</span> 
              {row.file_name}
            </TableCell>
            <TableCell align="left">{formatDate(row.upload_date)}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="left">
              <Tooltip title="Download Improved Document">
                <IconButton 
                  aria-label="download"
                  onClick={() => handleDownload(row.document_id, row.file_name)}
                  disabled={downloading}
                  sx={{ color: 'green' }}
                >
                  {downloading ? <CircularProgress size={24} /> : <DownloadIcon />}
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default MyDocument;
