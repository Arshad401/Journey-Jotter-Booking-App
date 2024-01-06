// import { useEffect, useState } from "react";
// import "./users.css";
// import axios from "axios";
// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from '@mui/material/Button';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//       backgroundColor: '#003580', 
//       color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
 
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
 
// ];

// export default function Users() {
//   const [users, setUsers] = useState([]);
  
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:9900/api/users/getalluser"
//         );
//         setUsers(res.data);
//       } catch (error) {}
//     };
//     fetchUser();
//   }, []);
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
          
//             <StyledTableCell>AVATAR</StyledTableCell>
//             <StyledTableCell>NAME</StyledTableCell>
//             <StyledTableCell align="center">EMAIL</StyledTableCell>
//             <StyledTableCell>ACTION</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <StyledTableRow key={user._id}>
//               <StyledTableCell align="left">
//                 <img src={user.avatar} style={{ width: '50px', height: '50px',borderRadius: '50%' }} alt="User Avatar" />
//               </StyledTableCell>
//               <StyledTableCell component="th" scope="row">
//                 {user.username}
//               </StyledTableCell>
//               <StyledTableCell align="center">{user.email}</StyledTableCell>
//               <StyledTableCell align="left">
//                 <Button variant="outlined" color="error">
//                   DELETE
//                 </Button>
//               </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }





// Users.js
import React, { useEffect, useState } from "react";
import "./users.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import PaginationRounded from './PaginationRounded'; // Import the PaginationRounded component
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#003580', 
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
 
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can change this value based on your requirement

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:9900/api/users/getalluser");
        setUsers(res.data);
      } catch (error) {}
    };
    fetchUser();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleDelete=async(id)=>{
    if(window.confirm("are you sure to delete")){
      try {
        await axios.delete(`http://localhost:9900/api/users/${id}`)
        toast.success("user deleted successfully")
      } catch (error) {
        console.error('Error deleting user:', error);
      }     
    }
    location.reload()
  }

  return (
    <>
    <h1 style={{color:"#003580"}}>Users</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>AVATAR</StyledTableCell>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell>ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateUsers().map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="left">
                  <img src={user.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="User Avatar" />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button variant="outlined" color="error" onClick={()=>handleDelete(user._id)}>
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add PaginationRounded component below the table */}
      <PaginationRounded
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
