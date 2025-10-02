import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack, Typography, Grid, TextField, Button, IconButton, InputAdornment, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Redirector() {

  const [shortCode, setShortCode] = useState("");
  const [openurl, setOpenurl] = useState(false);
  const [openSCode, setOpenSCode] = useState(false);
  const [data, setData] = useState([]);
  const [orgUrl, setOrgUrl] = useState("");
  const [req, setReq] = useState("");
  const [isShorten, setIsShorten] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updatedUrl, setUpdatedUrl] = useState("");

  const handleUrlSubmit = () => {
    if (!orgUrl) {
      console.error("URL is required.");
      return;
    }
    if (!isShorten) {
      axios.post(`/shorten`, { url: orgUrl })
        .then(res => {
          setReq(res.data)
          if (res.data) {
            setOpenurl(true);
            setIsShorten(true)
          }
        })
        .catch(err => console.error(err));
    }
    else {
      setIsShorten(false);
      setOrgUrl("");
      setOpenurl(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(req)
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(data.url)
  };

  const handleUpdateSubmit = () => {

    if (!shortCode) {
      console.error("Short code is required.");
      return;
    }
    axios.put(`/shorten/${shortCode.split("/").pop()}`, { url: updatedUrl })
      .then(res => {
        console.log("ok")
      })
      .catch(err => console.error(err));
  };


  const handleClear = () => {
    setOpenSCode(false);
    setOpenUpdate(false);
    setShortCode("");
  }

  const handleStaticsSubmit = () => {
    setOpenUpdate(false);
    if (!shortCode) {
      console.error("Short code is required.");
      return;
    }
    axios.get(`/shorten/${shortCode.split("/").pop()}/stats`)
      .then(res => {
        setData(res.data)
        if (res.data) setOpenSCode(true);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteSubmit = () => {
    if (!shortCode) {
      console.error("Short code is required to delete.");
      return;
    }
    axios.delete(`/shorten/${shortCode.split("/").pop()}`)
      .then(res => {
        console.log("Deleted:", res.data);
      })
      .then(setShortCode(""))
      .catch(err => console.error(err));
  };

  return (<>
    <Stack sx={{
      width: "100%",
    }}>
      <Typography variant="h4" align="center" //fontWeight="bold" 
        gutterBottom>
        URL SHORTENER
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          height: { xs: "auto", md: "30vh" },
          mx: "auto",
          my: { xs: 1, md: 3 },
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>Enter a URL to shorten</Typography>
        <TextField
          label="paste your URL here..."
          variant="outlined"
          fullWidth
          value={orgUrl}
          onChange={(e) => setOrgUrl(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button size="small" variant="contained" onClick={handleUrlSubmit}>
                  {isShorten ? "Shorten again" : ("Shorten")}
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {openurl &&
          <Box sx={{ my: 3 }} display="flex" alignItems="center" gap={3}>
            <Typography>your shortened URL: {req}</Typography>
            <Button size="small" variant="contained" onClick={handleCopy}>
              Copy
            </Button>
          </Box>}
      </Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%" },
          height: { xs: "60vh", md: "40vh" },
          mx: "auto",
          my: { xs: 1, md: 3 },
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography gutterBottom variant="h6" align="center">Retrieve Original URL</Typography>
        <TextField
          label="Enter short code"
          variant="outlined"
          fullWidth
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          InputProps={{
            endAdornment: (
              shortCode && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} edge="end">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>)
            ),
          }}
        />

        {openSCode &&
          <Box sx={{ my: 3 }} display="flex" alignItems="center" gap={3}>
            <Typography>The original URL is: {data.url} with {data.accessCount} view</Typography>
            <Button size="small" variant="contained" onClick={handleCopyUrl}>
              Copy URL
            </Button>
          </Box>}
        {openUpdate &&
          <Box sx={{ my: 3 }} display="flex" alignItems="center" gap={3}>
            <TextField
              label="Enter new url"
              variant="outlined"
              fullWidth
              value={updatedUrl}
              onChange={(e) => setUpdatedUrl(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button size="small" variant="contained" onClick={handleUpdateSubmit}>
                      Save
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ my: 2 }}
        >
          <Button
            variant="contained"
            onClick={handleDeleteSubmit}
            sx={{ flex: 1 }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleStaticsSubmit}
            sx={{ flex: 1 }}
          >
            URL Stats
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenUpdate(true);
              setOpenSCode(false);
            }}

            sx={{ flex: 1 }}
          >
            Update URL
          </Button>
        </Stack>
      </Box>
    </Stack>
  </>
  );
}

export default Redirector;
