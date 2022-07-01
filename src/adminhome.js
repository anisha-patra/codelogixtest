import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Dropzone from "react-dropzone";
import avatar2 from "../src/image/avatar-2.jpg";
import { reactLocalStorage } from "reactjs-localstorage";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getDatabase, ref, push, set, onValue, get, onChildAdded, update } from "firebase/database";
import moment from "moment";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box'
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
    const [userdetails, setuserdetails] = useState([]);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log("nee", newValue);
        setValue(newValue);
    };


    const dataa = {
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
                label: "Mobile",
                field: "mobile",
                sort: "asc",
                width: 200,
            },



        ],
        rows:
            userdetails
    };

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


        ],
        rows:
            logdetails
    };


    useEffect(() => {
        FetchUserlist();
        //FetchVisitorsList();


    }, []);
    const toggle = async () => {
        setdropdownOpen(!dropdownOpen)

    }

    const FetchUserlist = async () => {

        const dbRef = getDatabase();


        let arr = [];
        const starCountRef = ref(dbRef, 'users');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            console.log("data", data);
            if (snapshot.exists()) {
                snapshot.forEach((ele) => {
                    console.log("ele", ele.val());

                    let dom = {
                        userid: ele.val().userid,
                        name: ele.val().name,
                        emailid: ele.val().emailid,
                        mobile: ele.val().mobile



                    };
                    console.log(dom);
                    arr.push(dom);
                    console.log(arr);

                });

                setuserdetails(arr);

                console.log(logdetails);
            }

        });

    };



    // const FetchVisitorsList = async () => {

    //     const dbRef = getDatabase();


    //     let arr = [];
    //     const starCountRef = ref(dbRef, 'visitors');
    //     onValue(starCountRef, (snapshot) => {
    //         const data = snapshot.val();

    //         console.log("data", data);
    //         if (snapshot.exists()) {
    //             snapshot.forEach((ele) => {
    //                 console.log("ele", ele.val());
    //                 ele.forEach((elem) => {
    //                     let dom = {
    //                         logid: elem.val().logid,
    //                         mobile: elem.val().mobile,
    //                         name: elem.val().name,
    //                         emailid: elem.val().emailid,
    //                         purpose: elem.val().purpose,
    //                         intime: moment(ele.val().inTime).format("DD/MM/YYYY hh:mm a"),
    //                         outtime: ele.val().outTime != "" ? moment(ele.val().outTime).format("DD/MM/YYYY hh:mm a") : ele.val().outTime,



    //                     };
    //                     console.log(dom);
    //                     arr.push(dom);
    //                     console.log(arr);
    //                 });
    //             });

    //             setlogdetails(arr);

    //             console.log(logdetails);
    //         }

    //     });

    // };


    const fetchVisitorLogdetail = async (id) => {
        console.log("id", id);
        const dbRef = getDatabase();
        let user_id = reactLocalStorage.getObject("userData");

        let arr = [];
        const starCountRef = ref(dbRef, 'visitors/' + id);
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



                    };
                    console.log(dom);
                    arr.push(dom);
                    console.log(arr);
                });

                setlogdetails(arr);

                console.log(logdetails);
            }

        });
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        <img src={avatar2} className="avatar-xs rounded-circle" alt="" height="50px" width="50px" />

                        Admin
                    </DropdownToggle>
                    <DropdownMenu>

                        <DropdownItem
                            onClick={() => {
                                reactLocalStorage.setObject("userData", null);
                                window.location.href = "/adminlogin"
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
                        <h2>{value == "0" ? "List of Visitors" : "Visitors Log Details"}</h2>
                    </center>
                </b>
                <br></br>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="List Of Visitors" />
                        <Tab label="Visitors Log Details" />

                    </Tabs>
                </Box>
                {value == "0" ?
                    <Container fluid>
                        <Row>
                            {/* <BaseInfo /> */}

                            <Col xl={4}></Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <div className="card p-3">
                                    <MDBDataTable responsive bordered data={dataa} />
                                </div>
                            </Col>
                        </Row>

                    </Container> :
                    <Container fluid>
                        <Row>
                            <select
                                className="form-control"
                                onChange={(val) => {
                                    fetchVisitorLogdetail(val.target.value)
                                }}

                            >
                                <option value="">Select Visitor</option>
                                {userdetails.length > 0 && userdetails.map((it, index) => {
                                    return (
                                        <option value={it.userid}>{it.name}</option>
                                    )
                                })}

                            </select>

                        </Row>
                        <br></br>
                        <Row>
                            {/* <BaseInfo /> */}

                            <Col xl={4}></Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <div className="card p-3">
                                    <MDBDataTable responsive bordered data={data} />
                                </div>
                            </Col>
                        </Row>

                    </Container>}

            </div>
        </React.Fragment>
    );
}
