import React from 'react';
import { Navbar,Nav,NavItem,MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class App extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const currentPath = window.location.pathname;
        return(
            <div>                
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}