import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../user/userReducer/userSlice.ts";

interface responseData {
  name: {
    common: string;
  };
}

const Country = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [, setCountryName] = useState();

  const handleChange = (e: any) => {
    fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
      .then((res) => res.json())
      .then((data: responseData[]) => {
        const newCountryArr: string[] = data.map(
          (item: responseData) => item.name.common
        );
        setCountries(newCountryArr);
      });
  };

  const handleSelect = (e: any) => {
    const country = e.target.value;
    setCountryName(e.target.value);

    dispatch(addUser({ personalAddress: { country } }));
  };

  return (
    <div>
      <label>Country:</label>
      <br />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={countries}
        onSelect={handleSelect}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} onChange={handleChange} label="Select" />
        )}
      />
    </div>
  );
};

export default Country;
