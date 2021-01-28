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

export default function SimpleModal({ open, handleClose, data }) {
  const classes = useStyles();
  let body;
  if (data && open) {
    let hashes = data.map((row) => (
      <CustomTooltip
        title={row.description}
        placement="bottom"
        disableHoverListener={row.description ? false : true}
        arrow={true}
      >
        <TableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            {row.description
              ? row.name + " <p style={{color:'red'}}>*</p>"
              : row.name || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">{row.john || "-"}</StyledTableCell>
          <StyledTableCell align="center">{row.hashcat || "-"}</StyledTableCell>
        </TableRow>
      </CustomTooltip>
    ));
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
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">John</StyledTableCell>
                  <StyledTableCell align="center">Hashcat</StyledTableCell>
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
        <div className={classes.hint} onClick={handleClose}>
          <p style={{ color: "#E71D36", fontSize: 16, fontWeight: "bold" }}>
            Hover over an item to see it's description
          </p>
        </div>
        {body}
      </div>
    </Dialog>
  );
}
