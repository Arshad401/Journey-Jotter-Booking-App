import { useEffect, useState } from "react";
import "./users.css";
import axios from "axios";

// const Users = () => {
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
//     <div>
//       <div className="single">
//         {users.map((user) => (
//           <div key={user._id} className="singleContainer">
//             <div className="top">
//               <div className="left">
//                 <div className="editButton">Edit</div>
//                 <h1 className="title">Information</h1>

//                 <div className="item">
//                   <img src={user.avatar} alt="" className="itemImg" />
//                   <div className="details">
//                     <h1 className="itemTitle">{user.username}</h1>
//                     <div className="detailItem">
//                       <span className="itemKey">Email:</span>
//                       <span className="itemValue">{user.email}</span>
//                     </div>
//                     <div className="detailItem">
//                       <span className="itemKey">Phone:</span>
//                       <span className="itemValue">+1 2345 67 89</span>
//                     </div>
//                     <div className="detailItem">
//                       <span className="itemKey">Address:</span>
//                       <span className="itemValue">
//                         Elton St. 234 Garden Yd. NewYork
//                       </span>
//                     </div>
//                     <div className="detailItem">
//                       <span className="itemKey">Country:</span>
//                       <span className="itemValue">USA</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Users;
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9900/api/users/getalluser"
        );
        setUsers(res.data);
      } catch (error) {}
    };
    fetchUser();
  }, []);
  console.log(users);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>avatar</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell align="right">
                <img src={user.avatar} style={{ width: '50px', height: '50px',borderRadius: '50%' }} alt="User Avatar" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {user.username}
              </StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
