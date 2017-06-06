//dom.js
"use strict"

let dom = {
	init: ()=>{
		dom.gameboard = document.getElementById("gameboard")
		dom.grid = new Array(5).fill(0)
		dom.grid.map((e,x)=>{
			e=[]
			let row = document.createElement("div")
			row.id=`r${x}`
			row.classList.add('row')
			dom.gameboard.appendChild(row)
			for(let y=0; y<5; y++){
				let cell = document.createElement("div")
				cell.id = `c${x}${y}`
				cell.classList.add('card')
				cell.appendChild(document.createTextNode("*"));
				row.appendChild(cell)
				console.log(typeof e);
				console.log(e);
				e.push(document.getElementById(`c${x}${y}`));
			}
			return e
		})
	}
}