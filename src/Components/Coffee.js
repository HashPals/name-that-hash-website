import React from "react";

export default class BuyMeACoffe extends React.Component {
  constructor(props) {
    super(props);
    let script = document.createElement("script");
    script.setAttribute("data-name", "BMC-Widget");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-id", "beecodes");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Thank you for visiting, you can buy me a burrito and help to pay for server costs :sparkles:"
    );
    script.setAttribute("data-color", "#2EC4B6");
    script.setAttribute("data-position", "right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y-margin", "18");
    script.async = true;
    //Call window on load to show the image
    script.onload = function () {
      var evt = document.createEvent("Event");
      evt.initEvent("DOMContentLoaded", false, false);
      window.dispatchEvent(evt);
    };
    this.script = script;
  }

  componentDidMount() {
    document.head.appendChild(this.script);
  }

  componentWillUnmount() {
    document.head.removeChild(this.script);
    document.body.removeChild(document.getElementById("bmc-wbtn"));
  }

  render() {
    return null;
  }
}
