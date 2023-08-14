import Dot from "@/components/@extended/Dot";
import {
    Checkbox,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    Stack,
    Typography,
    TableSortLabel,
    TablePagination,
} from "@mui/material";
import React, { useMemo } from "react";
import { Link as RouteLink } from "react-router-dom";

type Order = "asc" | "desc";

interface Data {
    trackingNo: string;
    name: string;
    fat: number;
    carbs: number;
    protein: number;
}

// readonly Column[]
interface Column {
    id: keyof Data;
    align?: "inherit" | "left" | "center" | "right" | "justify";
    padding?: "normal" | "checkbox" | "none";
    label?: string;
}

const columns: readonly Column[] = [
    {
        id: "trackingNo",
        align: "left",
        // padding: false,
        label: "Tracking No.",
    },
    {
        id: "name",
        align: "left",
        // padding: true,
        label: "Product Name",
    },
    {
        id: "fat",
        align: "right",
        // padding: false,
        label: "Total Order",
    },
    {
        id: "carbs",
        align: "left",
        // padding: false,
        label: "Status",
    },
    {
        id: "protein",
        align: "right",
        // padding: false,
        label: "Total Amount",
    },
];

function createData(
    trackingNo: Data["trackingNo"],
    name: Data["name"],
    fat: Data["fat"],
    carbs: Data["carbs"],
    protein: Data["protein"]
): Data {
    return { trackingNo, name, fat, carbs, protein };
}

const rows = [
    createData("84564564", "Camera Lens", 40, 2, 40570),
    createData("98764564", "Laptop", 300, 0, 180139),
    createData("98756325", "Mobile", 355, 1, 90989),
    createData("98652366", "Handset", 50, 1, 10239),
    createData("13286564", "Computer Accessories", 100, 1, 83348),
    createData("86739658", "TV", 99, 0, 410780),
    createData("13256498", "Keyboard", 125, 2, 70999),
    createData("98753263", "Mouse", 89, 2, 10570),
    createData("98753275", "Desktop", 185, 1, 98063),
    createData("98753291", "Chair", 100, 0, 14001),
    createData("24564564", "Camera Lens", 40, 2, 40570),
    createData("28764564", "Laptop", 300, 0, 180139),
    createData("28756325", "Mobile", 355, 1, 90989),
    createData("28652366", "Handset", 50, 1, 10239),
    createData("23286564", "Computer Accessories", 100, 1, 83348),
    createData("26739658", "TV", 99, 0, 410780),
    createData("23256498", "Keyboard", 125, 2, 70999),
    createData("28753263", "Mouse", 89, 2, 10570),
    createData("28753275", "Desktop", 185, 1, 98063),
    createData("28753291", "Chair", 100, 0, 14001),
];

// status style
const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = "warning";
            title = "Pending";
            break;
        case 1:
            color = "success";
            title = "Approved";
            break;
        case 2:
            color = "error";
            title = "Rejected";
            break;
        default:
            color = "primary";
            title = "None";
    }
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (a[orderBy] > b[orderBy]) {
        return -1;
    }
    if (a[orderBy] < b[orderBy]) {
        return 1;
    }
    return 0;
}

// custom compare function
function getComparator<Key extends keyof Data>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return (a, b) =>
        order === "desc"
            ? descendingComparator(a, b, orderBy)
            : -descendingComparator(a, b, orderBy);
}

// sort
const stableSort = <T,>(
    array: readonly T[],
    compare: (a: T, b: T) => number
) => {
    const stabilizedThis = array
        .map(el => el as T)
        .sort((a, b) => compare(a, b));
    return stabilizedThis;
};

interface EnhancedTableProps {
    order: Order;
    orderBy: keyof Data;
    rowCount: number;
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
// Head
const EnhancedTableHead: React.FC<EnhancedTableProps> = props => {
    const {
        order,
        orderBy,
        rowCount,
        numSelected,
        onRequestSort,
        onSelectAllClick,
    } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={rowCount === numSelected && numSelected > 0}
                        indeterminate={
                            rowCount > numSelected && numSelected > 0
                        }
                        onChange={onSelectAllClick}
                        color="primary"
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {columns.map(column => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        sortDirection={orderBy === column.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : "asc"}
                            onClick={createSortHandler(column.id)}>
                            {column.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

interface Props {}
const RecentOrders: React.FC<Props> = () => {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("trackingNo");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = property === orderBy && order === "asc" ? "desc" : "asc";
        setOrderBy(property);
        setOrder(isAsc);
    };
    const visibleRows = useMemo(
        () =>
            stableSort<Data>(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
            ),
        [orderBy, order, page, rowsPerPage]
    );
    const isSelected = name => selected.indexOf(name) > -1;
    const handleClick = (_event: React.MouseEvent<unknown>, No: string) => {
        const selectdIndex = selected.indexOf(No);
        let newSelected: readonly string[] = [];
        if (selectdIndex < 0) {
            newSelected = newSelected.concat(selected, No);
        } else {
            newSelected = newSelected.concat(
                selected.slice(0, selectdIndex),
                selected.slice(selectdIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = rows.map(row => row.trackingNo);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer sx={{ maxHeight: 980 }}>
                <Table stickyHeader aria-label="simple table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={rows.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody sx={{ minWidth: 650, maxHeight: 980 }}>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            return (
                                <TableRow
                                    hover
                                    selected={isItemSelected}
                                    onClick={event =>
                                        handleClick(event, row.trackingNo)
                                    }
                                    key={row.trackingNo}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    sx={{ cursor: "pointer" }}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                "aria-labelledby": `enhanced-table-checkbox-${index}`,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            color="secondary"
                                            component={RouteLink}
                                            to="">
                                            {row.trackingNo}
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.fat}
                                    </TableCell>
                                    <TableCell align="left">
                                        <OrderStatus status={row.carbs} />
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.protein}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
export default RecentOrders;
