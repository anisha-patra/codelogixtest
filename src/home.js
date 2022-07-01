import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Dropzone from "react-dropzone";
import { reactLocalStorage } from "reactjs-localstorage";
import avatar2 from "../src/image/avatar-2.jpg";
import Checkout from "./checkout";
import { getDatabase, ref, push, set, onValue, get, onChildAdded, update } from "firebase/database";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from "moment";

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
import { async } from "@firebase/util";

// const data = 20;


export default function App() {
    const [name, setname] = useState("");
    const [details, setdetails] = useState("");
    const [InTime, setInTime] = useState("");
    const [OutTime, setOutTime] = useState("");
    const [mobile, setmobile] = useState("");
    const [logdetails, setlogdetails] = useState([]);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const emailid = reactLocalStorage.get("email");
    const [checkoutvalue, setcheckoutvalue] = useState(false);
    const [logid, setlogid] = useState("");
    const [username, setusername] = useState("");
    console.log("emil", emailid)
    const data = {
        columns: [
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 150,
            },
            {
                label: "Email",
                field: "emailid",
                sort: "asc",
                width: 150,
            },

            {
                label: "Purpose",
                field: "purpose",
                sort: "asc",
                width: 270,
            },
            {
                label: "Mobile",
                field: "mobile",
                sort: "asc",
                width: 200,
            },
            {
                label: "InTime",
                field: "intime",
                sort: "asc",
                width: 100,
            },
            {
                label: "OutTime",
                field: "outtime",
                sort: "asc",
                width: 150,
            },
            {
                label: "Checkout",
                field: "checkout",
                sort: "asc",
                width: 150,
            },

        ],
        rows:
            logdetails
    };


    useEffect(() => {


        FetchVisitorsList();
        FetchUserlist();


    }, []);

    const FetchUserlist = async () => {
        let user_id = reactLocalStorage.getObject("userData");
        const dbRef = getDatabase();


        let arr = [];
        const starCountRef = ref(dbRef, 'users/' + user_id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            console.log("userdata", data);
            console.log("userdata", data.name);
            setusername(data.name);

        })
    }


    const submit = async () => {
        let user_id = reactLocalStorage.getObject("userData");

        const dbRef = getDatabase();
        console.log("fgfgfg", dbRef)
        let date = moment(Date.now()).format("YYYY-MM-DD'");
        let fulltime = date + " " + InTime;
        if (name != "" && mobile != "" && details != "" && InTime != "") {

            let i = logdetails.findIndex((ele) => ele.outtime == "");
            console.log("i", i);
            if (i > -1) {
                window.alert("please end your ongoing session")
            }
            else {
                const starCountRef = ref(dbRef, 'visitors/' + user_id);
                onValue(starCountRef, (snapshot) => {
                    if (snapshot.exists()) {

                        let logid = push(starCountRef).key;


                        //Use the Push() method to append data to a list in multiuser applications.
                        // The Push() method generates a unique key every time
                        console.log("new key", logid);
                        set(ref(dbRef, 'visitors/' + user_id + "/" + logid), {
                            logid: logid,
                            name: name,
                            emailid: emailid,
                            mobile: mobile,
                            purpose: details,
                            inTime: fulltime,
                            outTime: ""
                        },

                            (error) => {
                                if (error) {
                                    alert("something went wrong");
                                } else {
                                    console.log("127");


                                }
                            }
                        );
                    }
                    else {
                        console.log("Entry");
                        set(ref(dbRef, 'visitors/' + user_id),
                            {


                            }
                        );
                        let logid = push(starCountRef).key;
                        console.log("msgid", logid);
                        set(ref(dbRef, 'visitors/' + user_id + "/" + logid), {
                            logid: logid,
                            name: name,
                            emailid: emailid,
                            mobile: mobile,
                            purpose: details,
                            inTime: fulltime,
                            outTime: ""
                        },

                            (error) => {
                                if (error) {
                                    alert("something went wrong");
                                } else {
                                    console.log("object");

                                }
                            }
                        );
                    }

                },
                    {
                        onlyOnce: true
                    }
                )
                // setmessage("");
                FetchVisitorsList();
            }
        }
        else {
            window.alert("please fill up all fields")
        }

    }

    const FetchVisitorsList = async () => {

        const dbRef = getDatabase();
        let user_id = reactLocalStorage.getObject("userData");

        let arr = [];
        const starCountRef = ref(dbRef, 'visitors/' + user_id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            console.log("data", data);
            if (snapshot.exists()) {
                snapshot.forEach((ele) => {
                    console.log("ele", ele.val());
                    let dom = {
                        logid: ele.val().logid,
                        mobile: ele.val().mobile,
                        name: ele.val().name,
                        emailid: ele.val().emailid,
                        purpose: ele.val().purpose,
                        intime: moment(ele.val().inTime).format("DD/MM/YYYY hh:mm a"),
                        outtime: ele.val().outTime != "" ? moment(ele.val().outTime).format("DD/MM/YYYY hh:mm a") : ele.val().outTime,
                        checkout: ele.val().outTime != "" ?
                            "You have checked out"
                            :

                            <Button
                                color="primary"
                                type="button"
                                className="waves-effect waves-light mr-1"
                                onClick={() => {
                                    setlogid(ele.val().logid)

                                    setcheckoutvalue(true)
                                }

                                }

                            >
                                Checkout

                            </Button >

                    };
                    console.log(dom);
                    arr.push(dom);
                    console.log(arr);
                });

                setlogdetails(arr);

                console.log(logdetails);
            }

        });

    };





    const toggle = async () => {
        setdropdownOpen(!dropdownOpen)

    }

    const CallBack = (val2) => {
        setcheckoutvalue(val2);
    };
    return (
        <React.Fragment>
            <div className="page-content">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        <img src={avatar2} className="avatar-xs rounded-circle" alt="" height="50px" width="50px" />

                        {username}
                    </DropdownToggle>
                    <DropdownMenu>

                        <DropdownItem
                            onClick={() => {

                                reactLocalStorage.clear();

                                window.location.href = "/login"
                            }}
                        >

                            Logout
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>
                <br></br>
                <b>
                    <center>
                        {" "}
                        <h2>Visitor's Log Form </h2>
                    </center>
                </b>
                <br></br>
                <Container fluid>
                    <Row>
                        {/* <BaseInfo /> */}
                        <Col xs={12}>
                            <Card>
                                <CardBody>
                                    <FormGroup row>
                                        <Label
                                            htmlFor="example-search-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Visitor Name:
                                        </Label>
                                        <Col md={10}>
                                            <input
                                                required
                                                id="question-input1"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                onChange={(val) => {
                                                    setname(val.target.value);
                                                }}
                                                value={name}
                                            ></input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            htmlFor="example-search-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Visitor Mobile No:
                                        </Label>
                                        <Col md={10}>
                                            <input
                                                id="question-input1"
                                                className="form-control"
                                                placeholder="Enter Mobile"
                                                onChange={(val) => {
                                                    setmobile(val.target.value);
                                                }}
                                                value={mobile}
                                            ></input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label
                                            htmlFor="example-search-input"
                                            className="col-md-2 col-form-label"
                                        >
                                            Purpose of Visit
                                        </Label>
                                        <Col md={10}>
                                            <textarea
                                                id="question-input1"
                                                className="form-control"
                                                placeholder="Enter Purpose"
                                                onChange={(val) => {
                                                    setdetails(val.target.value);
                                                }}
                                                value={details}
                                            ></textarea>
                                        </Col>
                                    </FormGroup>


                                    <FormGroup row>
                                        <Label
                                            htmlFor="example-search-input"
                                            className="col-md-2 col-form-label"
                                        >In Time
                                        </Label>
                                        <Col md={10}>
                                            <input
                                                type="time"
                                                id="question-input1"
                                                className="form-control"
                                                placeholder="In Time"
                                                onChange={(val) => {
                                                    setInTime(val.target.value);
                                                }}
                                                value={InTime}
                                            ></input>
                                        </Col>
                                    </FormGroup>





                                    <FormGroup className="mb-0">
                                        <div className="button-items pt-4">
                                            <Button
                                                color="primary"
                                                type="button"
                                                className="waves-effect waves-light mr-1"
                                                onClick={() => {
                                                    submit();
                                                }}
                                            >
                                                Checkin
                                                <i className="ri-arrow-right-line align-middle ml-1"></i>
                                            </Button>
                                        </div>
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={4}></Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <div className="card p-3">
                                <MDBDataTable responsive bordered data={data} />
                            </div>
                        </Col>
                    </Row>
                    {checkoutvalue ? (
                        <div
                            className={
                                checkoutvalue ? "modal single_modal fade show" : "modal fade "
                            }
                            tabindex="-1"
                            style={{ display: checkoutvalue ? "block" : "none" }}
                        >
                            <Checkout
                                CallBack={CallBack}
                                logid={logid}
                            />
                        </div>
                    ) : null}

                </Container>
            </div>
        </React.Fragment>
    );
}
