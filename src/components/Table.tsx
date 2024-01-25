import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store.ts";
import UserModal from "./Modal.tsx";
import { setOpen } from "./user/userReducer/allUserSlice.ts";
import { UserState } from "./user/userReducer/userSlice.ts";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import "../App.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#fafafa",
    },
  },
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "dob",
    headerName: "Date of birth",
    width: 150,
    editable: true,
  },
  {
    field: "Sex",
    headerName: "Sex",
    width: 150,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
    editable: true,
  },
  {
    field: "ID type",
    headerName: "ID type",
    width: 150,
    editable: true,
  },
  {
    field: "ID number",
    headerName: "ID number",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: true,
  },
  {
    field: "State",
    headerName: "State",
    width: 150,
    editable: true,
  },
  {
    field: "City",
    headerName: "City",
    width: 150,
    editable: true,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true,
  },
  {
    field: "Pincode",
    headerName: "Pincode",
    width: 150,
    editable: true,
  },
];

export default function Table() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.allUsers);
  const open = useSelector((state: RootState) => state.allUsers.open);
  const [rows, setRows]: any = useState([]);

  useEffect(() => {
    const newArr = new Set();
    allUsers.allUsers.map((user: UserState, idx: number) => {
      newArr.add({
        id: idx + 1,
        name: user.personalInfo?.name,
        dob: user.personalInfo?.dob,
        Sex: user.personalInfo?.sex,
        mobile: user.personalInfo?.mobile,
        "ID type": user.personalInfo?.governmentId_Type,
        "ID number": user.personalInfo?.governmentId,
        address: user.personalAddress?.address,
        State: user.personalAddress?.state,
        City: user.personalAddress?.city,
        country: user.personalAddress?.country,
        Pincode: user.personalAddress?.pincode,
      });
    });
    setRows([...newArr]);
  }, [allUsers]);

  const handleOpenModal = () => {
    dispatch(setOpen(true));
  };

  return (
    <>
      <div className="content">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p>Users Details</p>
          <Button onClick={handleOpenModal} variant="contained" color="primary">
            Add User
          </Button>
        </header>
        <Box className={classes.table} sx={{ height: 400, width: "100%" }}>
          <DataGrid
            className={classes.header}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

        <UserModal open={open} />
      </div>
    </>
  );
}
