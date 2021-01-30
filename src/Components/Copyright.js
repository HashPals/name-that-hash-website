import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

function Copyright() {
  return (
    <>
      <a
        href="https://github.com/HashPals/Name-That-Hash"
        style={{ color: "#FF9F1C" }}
        target="_blank"
      >
        <GitHubIcon />
      </a>{" "}
      <a
        target="_blank"
        href="https://twitter.com/bee_sec_san"
        style={{ color: "#FF9F1C" }}
      >
        <TwitterIcon />
      </a>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://example.com/">
          Name That Hash
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default Copyright;
