import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
 
export default class Login extends React.Component {
    constructor(props) {
        super(props); 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasTransitioned = false;
    }
    
    componentDidUpdate () {
        if(this.props.mappedInputState.isGameStarted && !this.hasTransitioned){
            sessionStorage.setItem('marioConfig', JSON.stringify({rows: this.props.mappedInputState.rows, columns: this.props.mappedInputState.columns}));
            this.hasTransitioned = true;
            this.props.router.push('/game');
        }
    }
 
    handleChange(e) {        
        const { name, value } = e.target;
        this.props.mappedChangeInput(name, parseInt(value));
    }
 
    handleSubmit(e) {
        e.preventDefault();
        this.props.mappedSubmit();
        if (this.props.mappedInputState.rows && this.props.mappedInputState.columns) {
            this.props.mappedLoadGame(this.props.mappedInputState.rows, this.props.mappedInputState.columns);
        }
    }
 
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Welcome to Mario Game</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (this.props.mappedInputState.submitted && !this.props.mappedInputState.rows ? ' has-error' : '')}>
                        <label htmlFor="rows">Rows</label>
                        <input type="number" className="form-control" name="rows" value={this.props.mappedInputState.rows} onChange={this.handleChange} />
                        {this.props.mappedInputState.submitted && !this.props.mappedInputState.rows &&
                            <div className="help-block">Enter valid number of Rows</div>
                        }
                    </div>
                    <div className={'form-group' + (this.props.mappedInputState.submitted && !this.props.mappedInputState.columns ? ' has-error' : '')}>
                        <label htmlFor="columns">Columns</label>
                        <input type="number" className="form-control" name="columns" value={this.props.mappedInputState.columns} onChange={this.handleChange} />
                        {this.props.mappedInputState.submitted && !this.props.mappedInputState.columns &&
                            <div className="help-block">Enter valid number of Columns</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Start Game!</button>
                    </div>
                </form>
            </div>
        );
    }
}