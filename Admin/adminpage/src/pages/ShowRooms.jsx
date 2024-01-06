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
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: '#003580', 
//         color: theme.palette.common.white,
//     }
    
//     ,
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// export default function showrooms() {

// const [rooms, setRooms] = useState([]);


// useEffect(() => {
//   const fetchrooms = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:9900/api/rooms"
//       );
//       setRooms(res.data);
//       console.log(res.data)
     
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchrooms();
// }, []);
//  console.log("room:",rooms)

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>ID</StyledTableCell>
//             <StyledTableCell align="right">TITLES</StyledTableCell>
//             <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
//             <StyledTableCell align="right">PRICE</StyledTableCell>
//             <StyledTableCell align="right">MAX-PEOPLE</StyledTableCell>
//             <StyledTableCell align="right">ACTION</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody >
//           {rooms.map((room) => (
//             <StyledTableRow key={room._id}>
//               <StyledTableCell component="th" scope="row">
//                 {room._id}
//               </StyledTableCell>
//               <StyledTableCell align="right">{room.title}</StyledTableCell>
//               <StyledTableCell align="right">{room.description}</StyledTableCell>
//               <StyledTableCell align="right">{room.price}</StyledTableCell>
//               <StyledTableCell align="right">{room.maxPeople}</StyledTableCell>
//               {/* <StyledTableCell align="right">{room.roomNumbers}</StyledTableCell> */}
//               <StyledTableCell align="right">
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


import React, { useState, useEffect } from "react";
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
import PaginationRounded from './PaginationRounded'; 

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

export default function Showrooms() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:9900/api/rooms");
        setRooms(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  const paginateRooms = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rooms.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <h1 style={{color:"#003580"}}>Rooms</h1>
      <TableContainer component={Paper}>   
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
       <TableHead>
          <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">TITLES</StyledTableCell>
              <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
              <StyledTableCell align="right">PRICE</StyledTableCell>
              <StyledTableCell align="right">MAX-PEOPLE</StyledTableCell>
              <StyledTableCell align="right">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginateRooms().map((room) => (
              <StyledTableRow key={room._id}>
                <StyledTableCell component="th" scope="row">
                  {room._id}
                </StyledTableCell>
                <StyledTableCell align="right">{room.title}</StyledTableCell>
                <StyledTableCell align="right">{room.description}</StyledTableCell>
                <StyledTableCell align="right">{room.price}</StyledTableCell>
                <StyledTableCell align="right">{room.maxPeople}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" color="error">
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
}
