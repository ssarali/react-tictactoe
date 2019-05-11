import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Since the Square components no longer maintain state, the Square components receive values from the Board component and inform the Board component
// when they’re clicked.In React terms, the Square components are now controlled components. 
class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                // When a Square is clicked, the onClick function provided by the Board is called
                // - The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
                // - When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method
                // - This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
                // - Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

// state of each square is now stored in the Board instead of the individual Square components.
// When the Board’s state changes, the Square components re-render automatically. 
// Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        /* slice creates a copy of the sqaure array to modify instead of modifying the existing array.
           Immutability:
           - mutate data: directly change the data values
           - or replace data with new copy with the desired changes like below
              - helps detect previous changes
            - when to re-render a component
        */
                const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({ squares: squares });
    }

    renderSquare(i) {
        return (
          <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        ); 
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
