import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./route";


export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div>

                <Switch>
                    {routes.map((route, index) => {
                        return route.component ? (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => <route.component {...props} />}
                            />
                        ) : null;
                    })}
                    <Redirect from="/" to="/login" />
                </Switch>

            </div>
        );
    }
}
