//game.js
"use strict"

let game = new (function(){
	let attractMode = true;
	let grid = new Array(5).fill(0)
	this.init = ()=>{
		buildGameGrid()
        startAttractMode()
	}
	this.reset = (wordList)=>{
		grid.forEach((row,rowIndex)=>{
			row.forEach((card,cardIndex)=>{
                let word = '*'
                if(wordList && wordList[rowIndex] && wordList[rowIndex][cardIndex]){
                    word = wordList[rowIndex][cardIndex]
                }
                card.setWord(word)
				card.setColor("hidden")
			})
		})
	}
    this.setGrid = (gridWords)=>{
        grid.setGridWords(gridWords)
    }
	this.reveal = (x,y,team)=>{
		grid[x][y].setColor(team)
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
			this.el.style.backgroundColor = teamColors[team]
		}
		this.setWord = (word)=>{
			this.el.innerHTML = word
		}
			
	}
	function buildGameGrid(){
		let gameboard = document.getElementById("gameboard")
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
				cell.appendChild(document.createTextNode("*"))
				row.appendChild(cell)
				e.push(new Cell(x,y))
			}
			return e
		})

	}
    
	function startAttractMode(){
		let attractModeKey = new Array(5).fill("x").map(e=>new Array(5).fill('x'));
		function setupAttractGame(){
			let names = ["movie", "equipment", "physics", "analysis", "policy", "series", "thought", "basis", "boyfriend", "direction", "strategy", "technology", "army", "camera", "freedom", "paper", "environment", "child", "instance", "month", "truth", "marketing", "university", "writing", "article", "department", "difference", "goal", "news", "audience", "fishing", "growth", "income", "marriage", "user", "combination", "failure", "meaning", "medicine", "philosophy", "teacher", "night", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "location", "success", "addition", "apartment", "education", "math", "moment", "painting", "politics", "attention", "decision", "event", "property", "shopping", "student", "wood", "office", "population", "president", "unit", "category", "cigarette", "context", "driver", "flight", "length", "magazine", "newspaper", "teaching", "cell", "dealer", "finding", "lake"];		
			names.sort(e=>Math.random()>.5);
			for(let x=5;x--;){
				for(let y=5; y--;){
					grid[x][y].setWord(names.pop())
				}
			}
			let pattern = ["Gold","Gold","Gold","Gold","Gold","Gold","Gold","Gold","Gold","Purple","Purple","Purple","Purple","Purple","Purple","Purple","Purple","Civilian","Civilian","Civilian","Civilian","Civilian","Civilian","Civilian","Assassin"];
			let gameSet = pattern.slice().sort(e=>Math.random()<.5);
			for(let x=5;x--;){
				for(let y=5; y--;){
					let p = gameSet.pop()
					attractModeKey[x][y] = p
				}
			}
			if(attractMode){
				setTimeout(setupAttractGame,24500)
			}
			
		}
		function tick(){
			let pick = null;
			let randX = 0
			let randY = 0
			while (pick==null){ 
				randX=Math.floor(Math.random()*5)
				randY=Math.floor(Math.random()*5)
				pick = attractModeKey[randX][randY]
			}
			game.reveal(randX,randY,pick);
			attractModeKey[randX][randY] = null;
			if(attractMode){
				setTimeout(tick,1000+(Math.floor(Math.random()*500)));
			}
		}
		
		game.reset();
        console.log(game)
		setupAttractGame();
		tick();
	}
})()

window.onload = ()=>{
    game.init()
}
	