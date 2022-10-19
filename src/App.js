import './App.css';
import React from 'react';
import {useForm} from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {TableContainer,} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState,} from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogActions from '@mui/material/DialogActions';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App(props){
  // let employees =[];
  const {register , handleSubmit, errors} = useForm();
  const[emp, setEmp] = useState([]);
  const [ inputValue, setInputValue ] = useState("Value from onchanges");
  //modal box
  const [open, setOpen] = React.useState(false);
  const [email,setEmail] = useState();
  const [name,setName] = useState();
  const [lname,setLname] = useState();
  const [editid,setEditId] = useState();
  const [editemail,setEditEmail] = useState();
  const [editname,setEditName] = useState();
  const [editlname,setEditLname] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [apidata , setApi] = useState([]);
  const [deldata , delApi] = useState([]);

  const [alertopen, setAlertOpen] = React.useState(false);
  const [alertupdate, setAlertUpdate] = React.useState(false);
  const [alertdelete, setAlertDelete] = React.useState(false);


  const [editOpen, setEditOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const AlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const AlertUpdate = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertUpdate(false);
  };
  const AlertDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertDelete(false);
  };
       
  function handleClickOpen(id){
   
    setEditOpen(true);
    // console.log(id)
    fetch(`http://localhost:3333/Student/${id}`).then(
    Response => {
      return Response.json();
    }
  ).then(
    data => {
    //   data.data.map((index)=>{
        // console.log(data)
        setEditId(data.id)
        setEditEmail(data.email)
        setEditName(data.name)
        setEditLname(data.lname)
    //     // setEmp(index)

    // })
      // setEmp(data)
    }
  )

    // setEditEmail(localStorage.getItem('editemail'));
    // setEditName(localStorage.getItem('editname'));
    // setEditLname(localStorage.getItem('editlname'));
    // console.log(editmail)
  };

  const handleEdit = () => {
    setEditOpen(false);
  };


 function handleUpdate(id){
    console.log(id);
    let editdata = {email:editemail,name:editname,lname:editlname}
  axios.put(`http://localhost:3333/Student/${id}`,
      editdata
    ).then((response) => {
      // console.log(response);
      setApi(response.data)
    }).catch((error) =>{
      // console.log(error);
    })
    setAlertUpdate(true);
    setEditEmail("")
    setEditName("")
    setEditLname("")
}

  useEffect(() => {
    fetch('http://localhost:3333/Student').then(
    Response => {
      return Response.json();
    }
  ).then(
    data => {
    //   data.data.map((index)=>{
        console.log(data)
    //     // setEmp(index)

    // })
      setEmp(data)
    }
  )
  },[apidata,deldata]);
  
  useEffect(() => {
    // console.log(emp)

  },[emp]);

  const submitHandler = (event) =>{
    
    event.preventDefault();
    console.log(email)
    axios.post('http://localhost:3333/Student',{
      email,
      name,
      lname,
    }).then((response) => {
      // console.log(response);
      setApi(response.data)
    }).catch((error) =>{
      // console.log(error);
    })
    setAlertOpen(true);
    setEmail("")
    setName("")
    setLname("")
  };
  // useEffect(()=>{
    
  // },[])
  function cancleHandler(){
    setInputValue("");
  };
  // function UpdateHandler(){

  // }
  function Delete(id){
    // e.preventDefault();
  
        axios.delete(`http://localhost:3333/Student/${id}`).then((r)=>{
          console.log(r);
            delApi(r)
          }).catch((e)=>{
          console.log();
        });
        setAlertDelete(true);
    }
  
  return (
    <>
     <Snackbar  open={alertopen} autoHideDuration={4000} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity="success" sx={{ width: '100%' }}>
          Added successfully
        </Alert>
      </Snackbar>
      <Snackbar  open={alertupdate} autoHideDuration={4000} onClose={AlertUpdate}>
        <Alert onClose={AlertUpdate} severity="success" sx={{ width: '100%' }}>
          Updated successfully
        </Alert>
      </Snackbar>
      <Snackbar  open={alertdelete} autoHideDuration={4000} onClose={AlertDelete}>
        <Alert onClose={AlertDelete} severity="success" sx={{ width: '100%' }}>
          Deleted successfully
        </Alert>
      </Snackbar>
   <Container>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <h1 style={{color:'#2196f3'}}>Employees List</h1>
        </Grid>
        <Grid item xs={6} md={4}>
        <h1><Button variant="contained" color="success" onClick={handleOpen}>Add Employee</Button></h1>
        </Grid>
      </Grid>
    </Box>
  
  
    <TableContainer component={Paper}>
      <Table sx={{ width: 1150 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{background:'#1e88e5'}}>
            <TableCell>Id</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">First name</TableCell>
            <TableCell align="center">last name</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emp.map((index) =>{
            return(
            <TableRow>
              <TableCell component="th" scope="row">
                {index.id}
              </TableCell>
              <TableCell align="center">{index.email}</TableCell>
              <TableCell align="center">{index.name}</TableCell>
              <TableCell align="center">{index.lname}</TableCell>
              <TableCell align='center'>
              <Stack direction="row" spacing={1} align="center">
                  <IconButton aria-label="edit" color="primary" onClick={(event)=>handleClickOpen(index.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={()=>Delete(index.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                {/* <Button variant="contained" color="secondary"> Edit</Button> /
                <Button variant="contained" color="secondary"> Delete</Button> */}
              </TableCell>
            </TableRow>
        )})}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        
          <form action="">
          <div className='space'><TextField name='email' label="Enter Email" variant="filled" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
          <div className='space' ><TextField name='Fname' label="Enter FirstName" variant="filled" value={name} onChange={(e)=>setName(e.target.value)}/></div>
          <div className='space'><TextField name='Lname' label="Enter LastName" variant="filled" value={lname} onChange={(e)=>setLname(e.target.value)} /></div>
          <div  className='btn-space' >
          <Button type='submit' variant="contained" color='primary' onClick={submitHandler}>Submit</Button>
          <Button type='submit' variant="contained" color='primary' onClick={cancleHandler}>Cancle</Button>
          </div>
          </form>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          
        </Typography>
      </Box>
    </Modal>

    {/* Update data */}

    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={editOpen} onClose={handleEdit}>
        <DialogTitle>Update List</DialogTitle>
        <DialogContent>
        {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            name="editemail"
            value={editid}
            onChange={(e)=>setEditId(e.target.value)}
            // label="Enter Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="editemail"
            value={editemail}
            onChange={(e)=>setEditEmail(e.target.value)}
            // label="Enter Email Address"
            type="email"
            fullWidth
            variant="standard"
            // ref={register({requied:"mail is requied"})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="editname"
            value={editname}
            onChange={(e)=>setEditName(e.target.value)}
            // label="Enter First Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='editlname'
            value={editlname}
            onChange={(e)=>setEditLname(e.target.value)}
            // label="Enter Last Name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type='Submit' onClick={(event)=>handleUpdate(editid)}>Update</Button>
          <Button onClick={handleEdit}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  </>
  
  );
}

export default App;
