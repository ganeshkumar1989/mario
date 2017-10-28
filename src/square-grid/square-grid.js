import React, {Component} from "react";
import PropTypes from "prop-types";

const makeEven = (n) => n - (n % 2);

export default class SquareGrid extends Component {
	constructor(props){
		super(props);

		this.state = {
            width: window.visualViewport.width,
            height: window.visualViewport.height
		};
        
        this.handleLayout = this.handleLayout.bind(this);
        window.addEventListener('resize', this.handleLayout);
	}
    
    handleLayout() {
        this.setState({
            width: document.getElementById("grid-container").parentNode.clientWidth,
            height: window.visualViewport.height
        });
    };
    
    componentDidMount() {
        this.setState({
            width: document.getElementById("grid-container").parentNode.clientWidth,
            height: window.visualViewport.height
        });
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleLayout);
    }

	render() {
		var props = this.props;
		var state = this.state;

		var width = state.width - 30;
		var height = state.height;

		var items = props.items;
		var renderItem = props.renderItem;

		var rows = props.rows || 0;
		var columns = props.columns || 0;        

		if(!rows && !columns) {
			console.error("Must specify number of rows or columns");
			return (<div/>);
		} else if(!columns) {
			console.error("Must specify number of columns");
			return (<div/>);
		}

		var marginHorizontal = 0;
		var marginVertical = 0;
		var size;
		var columnSize = makeEven(width / columns);
        var rowSize = makeEven(height / rows);
                
        size = Math.min(columnSize, rowSize);
        marginHorizontal = makeEven((width - (size*columns))/2);
        //marginHorizontal = makeEven(((width / columns) - size) / 2);
        marginVertical = makeEven((height - (size*rows))/2);
        //marginVertical = makeEven(((height / rows) - size) / 2);

		var itemStyle = {
			width: size,
			height: size,
            float: 'left'
		};
                
        var gridContainerStyle = {
            flex: 1,
            alignSelf: "stretch",
            flexWrap: "wrap",
            flexDirection: "row",
			marginLeft: marginHorizontal,
            marginRight: marginHorizontal,
			marginTop: marginVertical,
            marginBottom: marginVertical
        };

		var maxItems = rows * columns;
		var toRender = items.slice(0, maxItems);
		var renderedItems = toRender.map(function(item, index){
			return (
				<div style={itemStyle} key={index}>
					{renderItem(item, index)}
				</div>
			);
		});

		return (
			<div id="grid-container" style={gridContainerStyle}>
				{renderedItems}
			</div>
		);
	}
}

SquareGrid.propTypes = {
	rows: PropTypes.number,
	columns: PropTypes.number,
	items: PropTypes.arrayOf(PropTypes.any).isRequired,
	renderItem: PropTypes.func.isRequired
};

