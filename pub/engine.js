//engine.js
"use strict"

let engine = (()=>{
	let attractMode = true;
	
	window.onload = ()=>{
		dom.init()
		startAttractMode()
	}
	
	function startAttractMode(){
	
		let attractModeKey = new Array(5).fill("x").map(e=>new Array(5).fill('x'));
		
		function setupAttractGame(){
			dom.reset();
			let names = ["movie", "equipment", "physics", "analysis", "policy", "series", "thought", "basis", "boyfriend", "direction", "strategy", "technology", "army", "camera", "freedom", "paper", "environment", "child", "instance", "month", "truth", "marketing", "university", "writing", "article", "department", "difference", "goal", "news", "audience", "fishing", "growth", "income", "marriage", "user", "combination", "failure", "meaning", "medicine", "philosophy", "teacher", "night", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "location", "success", "addition", "apartment", "education", "math", "moment", "painting", "politics", "attention", "decision", "event", "property", "shopping", "student", "wood", "office", "population", "president", "unit", "category", "cigarette", "context", "driver", "flight", "length", "magazine", "newspaper", "teaching", "cell", "dealer", "finding", "lake"];		
			names.sort(e=>Math.random()>.5);
			for(let x=5;x--;){
				for(let y=5; y--;){
					dom.setWord(x,y,names.pop())
				}
			}
			let pattern = ["Gold","Gold","Gold","Gold","Gold","Gold","Gold","Gold","Gold","Purple","Purple","Purple","Purple","Purple","Purple","Purple","Purple","Civilian","Civilian","Civilian","Civilian","Civilian","Civilian","Civilian","Assassin"];
			let game = pattern.slice().sort(e=>Math.random()<.5);
			for(let x=5;x--;){
				for(let y=5; y--;){
					let p = game.pop()
					attractModeKey[x][y] = p
					console.log(`set ${x}:${y} to ${p}`)
					console.log(`remaining: ${game.length}`)
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
			dom.reveal(randX,randY,pick);
			attractModeKey[randX][randY] = null;
			if(attractMode){
				setTimeout(tick,1000+(Math.floor(Math.random()*500)));
			}
		}
		
		setupAttractGame();
		tick();
	}
})()