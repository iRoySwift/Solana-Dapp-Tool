import React from "react";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface Props {}
const Search: React.FC<Props> = () => {
    return (
        <Box sx={{ width: "100%", ml: 1 }}>
            <FormControl sx={{ width: 224 }}>
                <OutlinedInput
                    size="small"
                    id="header-search"
                    aria-describedby="header-search-text"
                    inputProps={{ "aria-label": "weight" }}
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    }
                    placeholder="Ctrl + K"
                />
            </FormControl>
        </Box>
    );
};
export default Search;
