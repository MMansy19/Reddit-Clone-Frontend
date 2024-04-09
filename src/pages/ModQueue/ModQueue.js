//this is page for modquue
import React from 'react';
import Header from '../../components/Header';
import SideBar from "../../layouts/Sidebar";
import ModqueueNavBar from '../../components/Modqueue/ModqueueNavBar';
import {Meta} from '@storybook/react';

function ModQueue() {
    return (
        <div className="navbar-padding">
            <Header />
<div className="header"></div>
<SideBar />
<div className="sidebar"></div>


            <div className="header">

                <h1 className="title">Modqueue</h1>
                <ModqueueNavBar />
            </div>
        </div>

    );

}
export default ModQueue;