import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { data } from "./data";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 18,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "99%",
    height: "99%",
    backgroundColor: theme.palette.background.paper,
    padding: 10,
  },
  button: {
    color: "#E71D36",
    display: "flex",
    position: "absolute",
    right: 10,
  },
  hint: {
    left: 10,
  },
  table: {
    minWidth: 50,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2EC4B6",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(4n+3)": {
      backgroundColor: "#909090",
    },
  },
}))(TableRow);
const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell>
          {row.description ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <IconButton aria-label="expand row" size="small">
              <p>-</p>
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.hashcat}</TableCell>
        <TableCell align="right">{row.john}</TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <p>{row.description}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function SimpleModal({ open, handleClose }) {
  const classes = useStyles();
  let body;
  if (data && open) {
    let hashes = data.map((row) => <Row key={row.name} row={row} />);
    body = (
      <>
        <h2 id="simple-modal-title" style={{ color: "#2EC4B6" }}>
          Results
        </h2>
        <p id="simple-modal-description">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Hashcat</StyledTableCell>
                  <StyledTableCell align="center">John</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hashes || (
                  <TableRow key="empty">
                    <StyledTableCell component="th" scope="row">
                      No results found
                    </StyledTableCell>
                    <StyledTableCell align="center">-</StyledTableCell>
                    <StyledTableCell align="center">-</StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </p>
      </>
    );
  } else {
    body = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} />
      </div>
    );
  }
  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className={classes.button} onClick={handleClose}>
          <CancelIcon />
        </div>
        <div className={classes.hint} onClick={handleClose}></div>
        {body}
      </div>
    </Dialog>
  );
}
