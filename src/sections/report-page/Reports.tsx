import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

const Reports = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [filterParam, setFilterParam] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");

    const data = [
        { id: 1, date: "2025-01-10", callDuration: "5 min", quality: "Good", agent: "John Doe", status: "Completed", category: "Sales" },
        { id: 2, date: "2025-01-11", callDuration: "15 min", quality: "Excellent", agent: "Jane Smith", status: "Pending", category: "Support" },
        { id: 3, date: "2025-01-12", callDuration: "8 min", quality: "Poor", agent: "Alice Brown", status: "Completed", category: "Sales" },
        { id: 4, date: "2025-01-13", callDuration: "12 min", quality: "Good", agent: "Chris Green", status: "Pending", category: "Support" },
        { id: 5, date: "2025-01-14", callDuration: "20 min", quality: "Excellent", agent: "Bob White", status: "Completed", category: "Sales" },
        { id: 6, date: "2025-01-15", callDuration: "7 min", quality: "Poor", agent: "Mary Black", status: "Failed", category: "Support" },
    ];

    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = () => {
        let filtered = data;

        if (startDate && endDate) {
            filtered = filtered.filter(
                (item) =>
                    new Date(item.date) >= startDate.toDate() &&
                    new Date(item.date) <= endDate.toDate()
            );
        }

        if (filterParam) {
            filtered = filtered.filter((item) => item.quality === filterParam);
        }

        if (status) {
            filtered = filtered.filter((item) => item.status === status);
        }

        if (category) {
            filtered = filtered.filter((item) => item.category === category);
        }

        setFilteredData(filtered);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />

                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                    />

                    <TextField
                        select
                        label="Call Quality"
                        value={filterParam}
                        onChange={(e) => setFilterParam(e.target.value)}
                        sx={{ '& > :not(style)': { width: '25ch' } }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Excellent">Excellent</MenuItem>
                        <MenuItem value="Poor">Poor</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ '& > :not(style)': { width: '25ch' } }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Failed">Failed</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ '& > :not(style)': { width: '25ch' } }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="Support">Support</MenuItem>
                    </TextField>

                    <Button variant="contained" onClick={handleFilter}>
                        Потвердить
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Call Duration</TableCell>
                                <TableCell>Quality</TableCell>
                                <TableCell>Agent</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.callDuration}</TableCell>
                                    <TableCell>{row.quality}</TableCell>
                                    <TableCell>{row.agent}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LocalizationProvider>
    );
};

export default Reports;
