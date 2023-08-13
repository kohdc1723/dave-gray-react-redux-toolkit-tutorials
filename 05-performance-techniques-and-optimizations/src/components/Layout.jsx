import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <React.Fragment>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default Layout;