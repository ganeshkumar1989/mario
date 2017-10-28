import React from 'react';
import { Alert,Glyphicon,Button,Modal,FormControl } from 'react-bootstrap';
import SquareGrid from "../square-grid/square-grid";
import KEYS from '../constants/keys';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.updateInterval = 300;
        this.startGame = this.startGame.bind(this);
        this.makeNextMove = this.makeNextMove.bind(this);
        this.endGame = this.endGame.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }
    
    componentWillMount() {
        debugger;
        this.props.mappedInitialize(
            this.props.config.rows*this.props.config.columns, 
            Math.floor((this.props.config.rows+this.props.config.columns)/2)
        );        
        document.addEventListener('keydown', this.onKeyDown);
    }
    
    startGame() {
        this.props.mappedStartGame();
        this.interval = setInterval(this.makeNextMove, this.updateInterval);
    }

    makeNextMove() {
        console.log("makeNextMove", this.props.mappedGameState)
        this.props.mappedNextMove(this.props.config.rows, this.props.config.columns);
        if(this.props.mappedGameState.food.length === 0){
            this.endGame();
        }
    }

    endGame() {
        this.props.mappedEndGame();
        if(this.interval){
            clearInterval(this.interval);
        }
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e) {
        e = e || window.event;
        let key;
        if (e.keyCode == '38') {
            key = KEYS.UP;
        }
        else if (e.keyCode == '40') {
            key = KEYS.DOWN;
        }
        else if (e.keyCode == '37') {
            key = KEYS.LEFT;
        }
        else if (e.keyCode == '39') {
            key = KEYS.RIGHT;
        }

        if(key){
            if(!this.props.mappedGameState.isGameStarted){
                this.startGame();
            }
            this.props.mappedKeyPressed(key);
        }
    }
    
    playAgain() {
        sessionStorage.setItem('marioConfig', undefined);
        this.props.router.push('/');
    }
    
    renderItem(item) {
        let mappedGameState = this.props.mappedGameState;
        return (
            <div className={"square " + ((mappedGameState.food.indexOf(item) !== -1)? "food": "") + " " + ((item === mappedGameState.marioPosition)? "mario": "")}></div>
        );
    }
    
    render(){
        const rows = this.props.config.rows;
        const columns = this.props.config.columns;
        
        if(this.props.mappedGameState.isGameOver){
            return(<div className="col-md-6 col-md-offset-3">
                        <h3>You have successfully completed the game!</h3>
                        <h4>Time Taken: {(this.props.mappedGameState.endTime - this.props.mappedGameState.startTime)/1000} seconds</h4>
                        <h4>Total Moves: {this.props.mappedGameState.noOfMoves}</h4>
                        <button className="btn btn-primary" onClick={this.playAgain}>Play Again!</button>
                    </div>
            );
        }
        else{
            return(<div className="col-md-12">
                        <SquareGrid rows={rows} columns={columns} items={Array.apply(null, {length: rows*columns}).map(Number.call, Number)} renderItem={this.renderItem.bind(this)} />
                    </div>
            );
        }
    }
}