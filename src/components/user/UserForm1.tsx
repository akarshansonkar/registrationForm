import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./userReducer/userSlice";
import * as yup from "yup";
import "../../App.css";
const Sex = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const IdType = [
  {
    value: "Aadhar",
    label: "Aadhar",
  },
  {
    value: "Pan",
    label: "Pan",
  },
];
const ageRegex = /^(0?[1-9]|[1-9][0-9]+)$/;
const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
const aadharRegex = /^[^01]\d{3}\s\d{4}\s\d{4}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name is too short"),
  dob: yup
    .string()
    .test(
      "valid-date-or-age",
      "Enter a valid Date of Birth or Age",
      function (value: any) {
        return dobRegex.test(value) || ageRegex.test(value);
      }
    )
    .required("Dob is required"),
  sex: yup.string().required("Sex is required"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Please enter valid number.")
    .required("Mobile is required")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  governmentId_Type: yup.string().required("Government Id Type is required"),
  governmentId: yup
    .string()
    .required("Government Id is required")
    .when("governmentId_Type", (governmentId_Type: string[], schema) => {
      if (governmentId_Type.includes("Pan")) {
        return schema
          .min(10)
          .max(10)
          .matches(panRegex, "Please enter a valid Pan Id");
      }
      if (governmentId_Type.includes("Aadhar")) {
        return schema.matches(aadharRegex, "Please enter a valid Aadhar Id");
      }
      return schema;
    }),
});

interface UserFormProps {
  onClick: () => void;
}

const UserForm: React.FC<UserFormProps> = (props: UserFormProps) => {
  const dispatch = useDispatch();

  interface UserData {
    name: string;
    dob: string;
    sex: string;
    mobile: string;
    governmentId_Type: string;
    governmentId: string;
  }

  interface FormErrors {
    name?: string;
    dob?: string;
    sex?: string;
    mobile?: string;
    governmentId_Type?: string;
    governmentId?: string;
  }

  const [formData, setFormData] = useState<UserData>({
    name: "",
    dob: "",
    sex: "",
    mobile: "",
    governmentId_Type: "",
    governmentId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const obj = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(obj);
    dispatch(addUser({ personalInfo: obj }));
  };
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    userSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        props.onClick();
      })
      .catch((err) => {
        const errorMessages = err.inner.reduce(
          (errors: Record<string, string>, error: any) => {
            return { ...errors, [error.path]: error.message };
          },
          {}
        );
        setErrors(errorMessages);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <br />
      <div>
        <label>Date of Birth:</label>
        <br />
        <TextField
          id="date"
          className="date"
          label="DD/MM/YYY or Age"
          hiddenLabel={true}
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      {errors.dob && <p className="error">{errors.dob}</p>}
      <div>
        <label>Sex:</label>
        <br />
        <TextField
          id="Sex"
          select
          className="textfeild"
          label="Select"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
        >
          {Sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {errors.sex && <p className="error">{errors.sex}</p>}
      </div>
      <br />
      <div>
        <label>Mobile:</label>
        <br />
        <TextField
          className="textfeild"
          id="outlined-required"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>
      <br />
      <div>
        <label>Government ID:</label>
        <br />
        <TextField
          id="governmentId_Type"
          select
          className="idtype"
          label="ID Type"
          name="governmentId_Type"
          value={formData.governmentId_Type}
          onChange={handleChange}
        >
          {IdType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {errors.governmentId_Type && (
          <p className="error">{errors.governmentId_Type}</p>
        )}

        <TextField
          className="idNumber"
          id="outlined-required"
          // defaultValue=''
          name="governmentId"
          value={formData.governmentId}
          onChange={handleChange}
        />
        {errors.governmentId && <p className="error">{errors.governmentId}</p>}
      </div>
      <br />
      <Button
        type="submit"
        variant="contained"
        className="Button"
        color="primary"
      >
        Next
      </Button>
    </form>
  );
};

export default UserForm;
