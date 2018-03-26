import React, { Component } from 'react';
import sudoku from 'sudoku';
import * as _ from 'lodash';

import './Board.css';
import Cell from '../../components/Cell/Cell';

class Board extends Component {
    constructor(props, context) {
        super(props, context);

        this.updateCell = this.updateCell.bind(this);
    }

    state = {
        cells: [],
        solvedPuzzle: [],
        freshPuzzle: []
    }

    // Converts raw array of numbers to array of row objects
    arrayToTable = (array) => {
        let table = [];
        let i, j, chunk = 9;

        for (i = 0, j = array.length; i < j; i += chunk) {
            table.push(array.slice(i, i + chunk));
        }

        return table;
    }

    // Generates a new board and stores it to state
    newBoard = () => {
        let puzzle = sudoku.makepuzzle();
        let solvedPuzzle = sudoku.solvepuzzle(puzzle);
        let freshPuzzle = [...puzzle];

        let newState = {
            cells: puzzle,
            solvedPuzzle: solvedPuzzle,
            freshPuzzle: freshPuzzle
        }

        this.setState(newState);  
    }

    // Called when cell value is changed
    updateCell = (index, value) => {
        let newState = {
            ...this.state
        };
        console.log(index);
        newState.cells[index] = parseInt(value);

        this.setState(newState);
        console.log(this.state);
    }

    // Check the solution
    checkSolution = () => {
        let solutionCorrect = true;

        for (let i=0; i<this.state.cells.length; i++) {
            console.log(this.state.cells[i]);
            if (this.state.cells[i] && this.state.cells[i] != this.state.solvedPuzzle[i]) {
                solutionCorrect = false;
            } 
        }

        if (solutionCorrect) {
            alert('Congrats! All of your (completed) squares are correct!');
        } else {
            alert('Your solution is incorrect. At least one of your squares needs to be changed.');
        }
    }

    componentDidMount() {
        this.newBoard();
    }

    render() {
        // storing 'this' as 'me' to avoid scoping issues
        let me = this;
        let cellIndex = -1;
        let rowIndex = -1;

        // Convert raw list of numbers to iterable array of row objects
        let cells = this.arrayToTable(this.state.cells);
        return (
            <div>
                <table className="board-table">
                    <tbody>
                        {_.map(cells, function (row) {
                            rowIndex++;
                            return (
                                <tr key={rowIndex}>
                                    {_.map(row, function (cell) {
                                        cellIndex++;
                                        let cellReadOnly = false;
                                        let cellValue = '';
                                        if (me.state.freshPuzzle[cellIndex] || me.state.freshPuzzle[cellIndex] == 0) {
                                            cellReadOnly = true;
                                        }
                                        if (cell) {
                                            cellValue = cell;
                                        }
                                        return (
                                                <Cell 
                                                    key={cellIndex}
                                                    index={cellIndex}
                                                    value={cellValue}
                                                    readOnly={cellReadOnly}
                                                    updateHandler={me.updateCell}/>
                                        )
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
                <br />
                <button onClick={this.checkSolution}>Check Answer</button>
                <button onClick={this.newBoard}>New Game</button>
            </div>
        )
    }
}

export default Board;