import { Merge } from "../data/Merge";
import * as React from "react";

<<<<<<< HEAD
type CellProps = {
	onMouseEnter: () => void;
	onClick: () => void;
	classes: string[];
	color: string;
}

function Cell(cellProps: CellProps) {
	cellProps.classes.push("stormtechlab_cell")
	return (
		<div
			className={cellProps.classes.join(" ")}
			style={{backgroundColor: cellProps.color}}
			onMouseEnter={cellProps.onMouseEnter}
			onClick={cellProps.onClick}
		/>
	)
}

export function Grid() {
	const width = 10, height = 15;
	function zeros(dimensions: number[]): any {
		const array = [];

		for (let i = 0; i < dimensions[0]; ++i) {
			array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
		}

		return array;
	}

	const [grid, setGrid] = React.useState(zeros([width, height]));
	const [ghostGrid, setGhostGrid] = React.useState(zeros([width, height]));

	function moveGhost(x: number, y: number) {
		const newgrid = zeros([width, height]);
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) {
				if(x+i > newgrid.length-1) continue;
				if(y+j > newgrid[x+i].length-1) continue;
				newgrid[x+i][y+j] = 1;
			}
		}
		
		setGhostGrid(newgrid);
	}

	function click(x: number, y: number) {
		const newgrid = grid.map((inner: any) => inner.slice());
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) {
				if(x+i > newgrid.length-1) continue;
				if(y+j > newgrid[x+i].length-1) continue;
				newgrid[x+i][y+j] = 1;
			}
		}
		setGrid(newgrid);
	}

	function color(x: number, y: number): string {
		if(ghostGrid[x][y] && grid[x][y]) return "red";
		if(ghostGrid[x][y]) return "white";
		if(grid[x][y]) return "green";
		return "";
	}

	function borderClasses(x: number, y: number): string[] {
		// if(!grid[x][y]) {
		// 	return [
		// 		"stormtechlab_cell_top",
		// 		"stormtechlab_cell_left",
		// 		"stormtechlab_cell_bottom",
		// 		"stormtechlab_cell_bottom",
		// 	];
		// }
		const classes = [];
		if(x-1 >= 0 && !grid[x-1][y]) classes.push("stormtechlab_cell_top");
		if(x+1 < width && !grid[x+1][y]) classes.push("stormtechlab_cell_bottom");
		// if(y-1 >= 0 && !grid[x][y-1]) classes.push("stormtechlab_cell_right");
		// if(y+1 < height && !grid[x][y+1]) classes.push("stormtechlab_cell_left");
		return classes;
	}

	// switch the width/length to make axis consistent.
	const elems = [];
	for(let j = 0; j < height; j++) {
		const cells = [];
		for(let i = 0; i < width; i++) {
			cells.push(<Cell
				key={i}
				onMouseEnter={() => moveGhost(i, j)}
				onClick={()=>click(i, j)}
				color={color(i, j)}
				classes={borderClasses(i, j)}
			/>);
		}
		elems.push(<div key={j} className="stormtechlab_row">
			{...cells}
		</div>)
	}

	return (<>
		{...elems}
	</>)
=======
export class Grid extends React.Component {

	blankGrid(width: number, height: number): string[][] {
		return Array.apply(null, {length: width}).map((x: any) => 
			Array.apply(null, {length: height}).map((x: any) => "·"));
	}

	mergeASCII(s0: string, s1: string): string {
		const char = Merge[s0][s1];
		if(char) {
			return char;
		}
		return s0;
	}


	addChip(grid: string[][], x: number, y: number, width: number, height: number) {
		for(let i = x+1; i < x+width-1; i++) {
			for(let j = y+1; j < y+height-1; j++) {
				grid[i][j] = " ";
			}
		}

		for(let i = x+1; i < x+width-1; i++) {
			grid[i][y] = this.mergeASCII("│", grid[i][y]);
			grid[i][y+height-1] = this.mergeASCII("│", grid[i][y+height-1]);
		}
		for(let j = y+1; j < y+height-1; j++) {
			grid[x][j] = this.mergeASCII("─", grid[x][j]);
			grid[x+width-1][j] = this.mergeASCII("─", grid[x+width-1][j]);
		}
		grid[x][y] = this.mergeASCII("┌", grid[x][y]);
		grid[x][y+height-1] = this.mergeASCII("┐", grid[x][y+height-1]);
		grid[x+width-1][y] = this.mergeASCII("└", grid[x+width-1][y]);
		grid[x+width-1][y+height-1] = this.mergeASCII("┘", grid[x+width-1][y+height-1]);
	}


	render() {
		const grid = this.blankGrid(10, 10);
		this.addChip(grid, 3, 5, 4, 3);
		this.addChip(grid, 0, 0, 6, 6);
		return (<>
			<pre style={{fontSize: '3em', lineHeight: '0.85em'}}>{grid.map(line => line.join("")).join("\n")}</pre>
		</>)
	}
>>>>>>> stormtech-lab
}