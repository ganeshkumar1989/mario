import KEYS from '../constants/keys';
import {DIRECTIONS, REVERSE_DIRECTIONS} from '../constants/directions';

const INITIAL_STATE = {
    tiles: undefined,
    food: [],
    marioPosition: undefined,
    direction:undefined,
    isGameStarted: false,
    isGameOver: false,
    startTime: undefined,
    endTime: undefined,
    noOfMoves: 0
}

const generateFood = (noOfTiles, noOfFoodTiles) => {
    const food = [];
    while(food.length < noOfFoodTiles){
        const rand = Math.floor(Math.random() * noOfTiles);
        if(food.indexOf(rand) === -1){
            food.push(rand);
        }
    }
    food.sort(function(a, b){return a-b;});
    return food;
};

const gameReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            let generatedMarioPosition = Math.floor(Math.random() * action.tiles);
            let food = generateFood(action.tiles, action.foodTiles);
            if(food.indexOf(generatedMarioPosition) !== -1){
                food.splice(food.indexOf(generatedMarioPosition), 1);    
            }            
            return {
                ...currentState,
                tiles: action.tiles,
                food: food,
                marioPosition: generatedMarioPosition,
                direction: currentState.direction,
                isGameStarted: false,
                isGameOver: false,
                startTime: undefined,
                endTime: undefined,
                noOfMoves: 0
            }
        case 'START_GAME':
            return {
                ...currentState,
                tiles: currentState.tiles,
                food: currentState.food,
                marioPosition: currentState.marioPosition,
                direction: currentState.direction,
                isGameStarted: true,
                isGameOver: false,
                startTime: new Date(),
                endTime: undefined,
                noOfMoves: 0
            }
        case 'KEY_PRESSED':
            return {
                ...currentState,
                tiles: currentState.tiles,
                food: currentState.food,
                marioPosition: currentState.marioPosition,
                direction: action.key,
                isGameStarted: currentState.isGameStarted,
                isGameOver: false,
                startTime: currentState.startTime,
                endTime: currentState.endTime,
                noOfMoves: currentState.noOfMoves
            }
        case 'NEXT_MOVE':
            let marioPosition = currentState.marioPosition, 
                direction = currentState.direction;
            
            switch(currentState.direction){
                case DIRECTIONS.UP:
                    if((marioPosition-action.columns) < 0){
                        direction = REVERSE_DIRECTIONS[direction];
                    }
                    else{
                        marioPosition = marioPosition-action.columns;
                    }
                    break;
                case DIRECTIONS.DOWN:
                    if((marioPosition+action.columns) > (currentState.tiles-1)) {
                        direction = REVERSE_DIRECTIONS[direction];
                    }
                    else{
                        marioPosition = marioPosition+action.columns;
                    }
                    break;
                case DIRECTIONS.LEFT:
                    if((marioPosition%action.columns) === 0){
                        direction = REVERSE_DIRECTIONS[direction];
                    }
                    else{
                        marioPosition--;
                    }
                    break;
                case DIRECTIONS.RIGHT:
                    if((marioPosition%action.columns) === (action.columns-1)){
                        direction = REVERSE_DIRECTIONS[direction];
                    }
                    else{
                        marioPosition++;
                    }
                    break;
            }
            
            let foodInMarioPosition = currentState.food.indexOf(marioPosition);
            if(foodInMarioPosition !== -1){
                currentState.food.splice(foodInMarioPosition, 1);
            }
            
            return {
                ...currentState,
                tiles: currentState.tiles,
                food: currentState.food,
                marioPosition: marioPosition,
                direction: direction,
                isGameStarted: currentState.isGameStarted,
                isGameOver: false,
                startTime: currentState.startTime,
                endTime: currentState.endTime,
                noOfMoves: currentState.noOfMoves + 1
            }
        case 'END_GAME':
            return {
                ...currentState,
                tiles: currentState.tiles,
                food: currentState.food,
                marioPosition: currentState.marioPosition,
                direction: currentState.direction,
                isGameStarted: currentState.isGameStarted,
                isGameOver: true,
                startTime: currentState.startTime,
                endTime: new Date(),
                noOfMoves: currentState.noOfMoves
            }
        default:
            return currentState;
    }
}

export default gameReducer;