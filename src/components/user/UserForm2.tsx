import { Button, TextField } from "@mui/material";
import Country from "../country/Country";
import { useState } from "react";
import { addUser } from "./userReducer/userSlice";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, setOpen } from "./userReducer/allUserSlice";
import { RootState } from "../../store";
// import DataTable from "datatables.net-dt";

const userSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pincode: yup.string().required("Pincode is required"),
});

interface FormErrors {
  address?: string;
  state?: string;
  city?: string;
  pincode?: string;
}

const UserForm2 = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});

  interface UserData {
    address: string;
    state: string;
    city: string;
    pincode: string;
  }

  const [formData, setFormData] = useState<UserData>({
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const obj = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(obj);
    dispatch(addUser({ personalAddress: obj }));
  };
  const userState = useSelector((state: RootState) => state.user);

  const Result = () => {
    dispatch(
      allUsers({
        allUsers: [userState],
        open: false,
      })
    );

    userSchema
      .validate(formData, { abortEarly: false })
      .then(() => {})
      .catch((err: any) => {
        const errorMessages = err.inner.reduce(
          (errors: Record<string, string>, error: any) => {
            return { ...errors, [error.path]: error.message };
          },
          {}
        );
        setErrors(errorMessages);
      });

    dispatch(setOpen(false));
  };

  return (
    <div>
      <div>
        <label>Address:</label>

        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>
      <br />
      <div>
        <label>State:</label>
        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        {errors.state && <p className="error">{errors.state}</p>}
      </div>
      <br />
      <div>
        <label>City:</label>
        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <p className="error">{errors.city}</p>}
      </div>
      <br />
      <Country />

      <br />
      <div>
        <label>Pincode:</label>
        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        {errors.pincode && <p className="error">{errors.pincode}</p>}
      </div>
      <br />
      <div>
        <Button
          className="Button"
          onClick={Result}
          variant="contained"
          color="success"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserForm2;
