import { Autocomplete, Box, TextField, Typography } from "@mui/material";

export default function CustomSelectAccount({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: any;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <Autocomplete
      freeSolo
      slotProps={{ clearIndicator: undefined }}
      options={options}
      onChange={(event, value) => {
        console.log(value);
        onChange(String(value));
      }}
      renderOption={(props, option) => (
        <Box {...(props as any)} key={option} sx={{ height: "80px" }}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
          label={label ?? "Número da Conta"}
        />
      )}
      sx={{
        height: "83px",
        "& .MuiFormControl-root": {
          height: "100% !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
          height: "83px",
          justifyContent: "center",
        },
        "& .MuiInputBase-root.MuiOutlinedInput-root ": {
          height: "100%",
        },
      }}
    />
  );
}
