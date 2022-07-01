import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, set, onValue, get, onChildAdded, update } from "firebase/database";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
  UncontrolledAlert,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import moment from "moment";


const Checkout = (props) => {
  const [OutTime, setOutTime] = useState("");

  const Submit = async (id) => {
    let date = moment(Date.now()).format("YYYY-MM-DD'");
    let fulltime = date + " " + OutTime;
    if (OutTime != "") {
      console.log(props.logid)
      console.log(OutTime)
      let user_id = reactLocalStorage.getObject("userData");
      const dbRef = getDatabase();
      update(ref(dbRef, 'visitors/' + user_id + "/" + props.logid), {

        outTime: fulltime
      });
      props.CallBack(false)
      window.location.href = "/home";
    }
    else {
      window.alert("Please select the checkout Time")
    }
  }
  return (
    <div className="ProfDelete">
      <div className="modal-dialog">
        <div className="modal-content p-5">
          <div className="">
            <span></span>
            <button
              type="button"
              className="close Single_close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.CallBack(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <h5 className="mb-5 pb-3  text-center font-weight-bold">
            Select Checkout Time
          </h5>
          <FormGroup row>
            <Label
              htmlFor="example-search-input"
              className="col-md-2 col-form-label"
            >Out Time
            </Label>
            <Col md={10}>
              <input
                type="time"
                id="question-input1"
                className="form-control"
                placeholder="In Time"
                onChange={(val) => {
                  setOutTime(val.target.value);
                }}
                value={OutTime}
              ></input>
            </Col>
          </FormGroup>

          <div className=" text-center">
            <button className="btn w-50 PrimaryBtn-outline"
              onClick={() => {
                Submit();

              }


              }

            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
