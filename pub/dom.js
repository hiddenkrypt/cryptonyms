//dom.js
"use strict"

let dom = new (function(){
	let gameboard = {};
	let grid = new Array(5).fill(0)
	this.init = ()=>{
		buildGameGrid()
	};
	this.reset = ()=>{
		grid.forEach(r=>{
			r.forEach(card=>{
				card.setWord('*');
				card.setColor("hidden");
			})
		})
	}
	this.setWord = (x,y,word)=>{
		grid[x][y].setWord(word)
	}
	this.reveal = (x,y,team)=>{
		grid[x][y].setColor(team);
	}
	function Cell(x,y){
		let teamColors = {
			"Gold":	"#a0ae00",
			"Purple": "#500070",
			"Civilian": "#929292",
			"Assassin": "#323232",
			"hidden": "#eee"
		}
		this.el = document.getElementById(`c${x}${y}`)
		this.setColor = (team)=>{
			//console.log(`setting ${x}:${y} to ${team}:${teamColors[team]}`)
			this.el.style.backgroundColor = teamColors[team]
		}
		this.setWord = (word)=>{
			this.el.innerHTML = word
		}
			
	}
	function buildGameGrid(){
		gameboard = document.getElementById("gameboard")
		grid = grid.map((e,x)=>{
			e=[]
			let row = document.createElement("div")
			row.id=`r${x}`
			row.classList.add('row')
			gameboard.appendChild(row)
			for(let y=0; y<5; y++){
				let cell = document.createElement("div")
				cell.id = `c${x}${y}`
				cell.classList.add('card')
				cell.appendChild(document.createTextNode("*"));
				row.appendChild(cell)
				e.push(new Cell(x,y))
			}
			return e
		})
	}
})()