import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RegisterForm = () => {
  const [sme_name, setsme_name] = useState("");
  const [sme_business, setsme_business] = useState("");
  const [sme_location, setsme_location] = useState("");
  const [showdashboard, setshowdashboard] = React.useState(false);
  const [showcampaigngenerate, setshowcampaigngenerate] = React.useState(false);
  const [sme_USP, setPassword] = useState("");
  const [product_list, setproduct_list] = useState("");
  const [value, setValue] = React.useState(0);
  const [mode, setMode] = React.useState(0);

  const [isShown, setIsShown] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const [backendresponse, setbackendresponse] = React.useState();

  const [backendgenerateresponse, setbackendgenerateresponse] = React.useState([]);
  const [backendgenerateresponseshow, setbackendgenerateresponseshow] = React.useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(sme_name, sme_business, sme_location, sme_USP);
  }

  const handleMode = (event) => {
    console.log(event);
    setMode(event.target.value);
  };

  function callApi(e) {
    setshowdashboard(true);
    const formData = new FormData();
    formData.append("sme_name", sme_name);
    formData.append("sme_business", sme_business);
    formData.append("sme_location", sme_location);
    formData.append("sme_USP", sme_USP);
    formData.append("file", product_list);
    formData.append("mode", mode);

    axios
      .post("http://10.196.221.178:5000/generateFirstCampaign", formData)
      .then((res) =>
        // console.log(res)
        setbackendresponse(res.data.data)
      )

      .catch((err) => console.log(err));
  }

  function callModeApi(e) {
    const formData = new FormData();
    formData.append("sme_name", sme_name);
    formData.append("sme_business", sme_business);
    formData.append("sme_location", sme_location);
    formData.append("sme_USP", sme_USP);
    formData.append("file", product_list);
    formData.append("mode", mode);

    axios
      .post("http://10.196.221.178:5000/runCampaign", formData)
      .then((res) =>
      {
        setbackendgenerateresponse(res.data.data)
        setbackendgenerateresponseshow(false)
      }
        // console.log(res)

        
      )

      .catch((err) => console.log(err));
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
      {!showdashboard && (
        <div>
          <h2>Survey</h2>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="What is your company name?"
                onChange={(e) => setsme_name(e.target.value)}
                value={sme_name}
                fullWidth
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="What is the nature of your business?"
                onChange={(e) => setsme_business(e.target.value)}
                value={sme_business}
                fullWidth
              />
            </Stack>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Where are you located?"
              onChange={(e) => setsme_location(e.target.value)}
              value={sme_location}
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="What is your USP?"
              onChange={(e) => setPassword(e.target.value)}
              value={sme_USP}
              fullWidth
              sx={{ mb: 4 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <Button variant="contained" color="primary" component="label">
                Tell us about your customers!
                <input
                  type="file"
                  hidden
                  accept=".csv"
                  helperText="Please upload a csv"
                  onChange={(e) => setproduct_list(e.target.files[0])}
                />
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                onClick={(e) => callApi(e)}
              >
                submit
              </Button>
            </Stack>
          </form>
        </div>
      )}

      {showdashboard && (
        <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="Generate" {...a11yProps(1)} />
                <Tab label="Personalize" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{  display: 'flex',fontSize: 20, justifyContent: 'space-around', }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Your First Ad Campaign is Ready!!!!
                    <br></br>
                  </Typography>
                  <Typography variant="h3" component="div" sx={{  display: 'flex', justifyContent: 'space-around' }}>
                  {backendresponse && backendresponse["Campaign Title"]}
                  
                  </Typography>
                  <br></br>
                  <Typography variant="h6"  sx={{  display: 'flex', justifyContent: 'center', }} >
                  {backendresponse && backendresponse["Campaign Description"]}
                  </Typography>
                  <br></br>
                  <Typography variant="h5" component="div" sx={{  display: 'flex', justifyContent: 'space-around', color:'red' }}>
                  {backendresponse && backendresponse["Campaign Call to Action"]}
                    <br />
                   
                  </Typography>
                </CardContent>
                <CardActions>
                  
                </CardActions>
              </Card>
              
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Stack direction="row" spacing={2}>
                {backendgenerateresponseshow && <Button variant="outlined" onClick={handleClick}>
                  Run Campaign
                </Button>}
                
                {isShown ? (
                    <div>
                  <Box sx={{ minWidth: 120 }}>
                    {backendgenerateresponseshow && <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Mode
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mode}
                        label="Mode"
                        onChange={handleMode}
                      >
                        <MenuItem value={0}>Brand Ambassador</MenuItem>
                        <MenuItem value={1}>New Product Launch</MenuItem>
                        <MenuItem value={2}>Weekend Sale</MenuItem>
                        <MenuItem value={3}>Special Event Campagin</MenuItem>
                        <MenuItem value={4}>Festive Offer Campaign</MenuItem>
                      </Select>
                      
                    </FormControl> }
                    
                    
                  </Box>
                    <Button variant="outlined" onClick={(e) => callModeApi(e)}>
                    Generate
                  </Button>
                  </div>
                ) : null }
                 <Button variant="outlined" >
                Blogs
              </Button>
              </Stack>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            onClick={(e) => setshowdashboard(false)}
          >
            Back
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
