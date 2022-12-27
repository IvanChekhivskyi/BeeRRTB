import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {RouterArray} from "./RouterArray";

const AppRouter = () => {
    return (
        <div>
            <Switch>
                {RouterArray.map(rout =>
                        <Route component={rout.component}
                               path={rout.path}
                               exact={rout.exact}
                               key={rout.path}
                        />
                )}
                        <Redirect to={"/head"}/>
            </Switch>

        </div>

    );
};

export default AppRouter;