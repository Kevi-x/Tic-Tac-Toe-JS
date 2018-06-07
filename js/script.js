
window.addEventListener("load", eventWindowLoaded,false);

function eventWindowLoaded(){
	canvasApp();
}


function canvasApp(){
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");

	var fieldSize = canvas.width / 3;
	var player;
	var boardArr;
	var emptyFields;
	var endStateFlag = false;
	var xpoint = 0;
	var opoint = 0;
	function drawLines(){
		
		for(var i=0;i<2;i++){	
			
			ctx.beginPath();
			ctx.moveTo(fieldSize+(i*fieldSize),0);
			ctx.lineTo(fieldSize+(i*fieldSize),canvas.height);
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#0da192";
			ctx.stroke();

		}

		for(var i=0;i<2;i++){	
			
			ctx.beginPath();
			ctx.moveTo(0,fieldSize+(i*fieldSize));
			ctx.lineTo(canvas.height,fieldSize+(i*fieldSize));
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#0da192";
			ctx.stroke();

		}

	}
	function init(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		boardArr = [
		['','',''],
		['','',''],
		['','','']
	];
		emptyFields = 9;
		player = 'x';
		drawLines();
		endStateFlag = false;
		
	}


	function drawO(radius, xIndex,yIndex){

		  ctx.beginPath();
	      ctx.arc(xIndex, yIndex, radius, 0, 2 * Math.PI, false);
	      ctx.lineWidth = 10;
	      ctx.strokeStyle = '#f2ebd3';
	      ctx.stroke();
		
	}



	function drawX(xIndex,yIndex){

		
			ctx.beginPath();
			ctx.moveTo(xIndex*fieldSize+40,yIndex*fieldSize+40);
			ctx.lineTo((xIndex+1)*fieldSize-40,(yIndex+1)*fieldSize-40);
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#545454";
			ctx.stroke();
		
		
			ctx.beginPath();		
			ctx.moveTo((xIndex+1)*fieldSize-40,yIndex*fieldSize+40);
			ctx.lineTo(xIndex*fieldSize+40,(yIndex+1)*fieldSize-40);
			ctx.lineWidth = 10;
			ctx.strokeStyle = "#545454";
			ctx.stroke();	
			

	}


	function drawMark(player, xIndex,yIndex){
		
  	if(player == 'x'){

  		drawX(xIndex,yIndex);



  	}else {
  		var canterX = (xIndex*fieldSize)+fieldSize/2;
  		var centerY = (yIndex*fieldSize)+fieldSize/2;
  		drawO(43,canterX,centerY);
  	}

	}

	function checkEndingState(player, xIndex,yIndex){

		if(checkRow(player, yIndex)||
		checkColumn(player,xIndex)||
		checkDiagonals(player))
		{
			return true;
		} else if(emptyFields==0){
			return true;
		} else{
			return false;
		}


	}
	
	function checkColumn(player,xIndex){
		
		for(var i=0 ; i<3 ; i++){

			if(boardArr[i][xIndex] !== player){
				break;
			}

			else if(i == 2){
					return true;
			}

		}
		return false;
	}

	function checkRow(player, yIndex){

		

		for(var i=0 ; i<3 ; i++){

			if(boardArr[yIndex][i] !== player){
				break;
			}

			else if(i == 2){
					return true;
			}

		}
		return false;
	}
	
	function checkDiagonals(player){



		for(var i = 0; i < 3; i++){

			if(boardArr[i][i] !== player){
				break;
			} else if(i == 2){
					return true;
			}

		}

		for(var i = 0; i < 3; i++){
			
		

			if(boardArr[i][2-i] !== player){
				break;
			} else if(i == 2){
					return true;
			}

		}

		return false;

	}   
	function draw(){
	
		ctx.beginPath();
		ctx.moveTo(155,150);
		ctx.lineTo(260,250);
		ctx.lineWidth = 15;
		ctx.strokeStyle = "#545454";
		ctx.stroke();

		ctx.beginPath();		
		ctx.moveTo(260,150);
		ctx.lineTo(155,250);
		ctx.lineWidth = 15;
		ctx.strokeStyle = "#545454";
		ctx.stroke();
		
		ctx.beginPath();
		ctx.arc((canvas.width/2)+100, canvas.height/2-50, 55, 0, 2 * Math.PI, false);
		ctx.lineWidth = 15;
		ctx.strokeStyle = '#f2ebd3';
		ctx.stroke();
		
		ctx.font = "50px Arial";
		ctx.fillStyle = "#565151";
		ctx.textAlign = "center";
		ctx.fillText("Draw!",canvas.width/2+15,canvas.height-150);
	}

	function endState(player){

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(emptyFields > 0) {

			if(player == 'x'){
				ctx.beginPath();
				ctx.moveTo((canvas.width/2)-50,canvas.height/2-50);
				ctx.lineTo((canvas.width/2)+50,canvas.height/2+50);
				ctx.lineWidth = 15;
				ctx.strokeStyle = "#545454";
				ctx.stroke();

				ctx.beginPath();		
				ctx.moveTo((canvas.width/2)+50,canvas.height/2-50);
				ctx.lineTo((canvas.width/2)-50,canvas.height/2+50);
				ctx.lineWidth = 15;
				ctx.strokeStyle = "#545454";
				ctx.stroke();
				xpoint++;
				
			} else {
				ctx.beginPath();
				ctx.arc((canvas.width/2), canvas.height/2-50, 60, 0, 2 * Math.PI, false);
				ctx.lineWidth = 15;
				ctx.strokeStyle = '#f2ebd3';
				ctx.stroke();
				opoint++;
			}	
			ctx.font = "50px Arial";
			ctx.fillStyle = "#565151";
			ctx.textAlign = "center";
			ctx.fillText("Winner!",canvas.width/2,canvas.height-150);
			var elementx = document.getElementById("pointx");
			var elemento = document.getElementById("pointo");
			elementx.innerHTML = xpoint;
			elemento.innerHTML = opoint;
			
			return true;



		} else{
				
			draw();
			return true;
		}
		return false;
		
	}   


	


	init();
	function changePlayer(player){
		
		if(player == 'x'){
			console.log(player);
			var elementx = document.getElementById("xscore");
			var elemento = document.getElementById("oscore");
			elementx.classList.add("activePlayer");
			elemento.classList.remove("activePlayer");
			return 'o';
			
		} else{
			var elementx = document.getElementById("xscore");
			var elemento = document.getElementById("oscore");
			elementx.classList.remove("activePlayer");
			elemento.classList.add("activePlayer");
			return 'x';
		}
		
		
	}
	canvas.addEventListener("mouseup", hoverOver,false);

	function hoverOver(e){
		

		var field = canvas.getBoundingClientRect(),
        mx = e.clientX - field.left,
        my = e.clientY - field.top,

        xIndex = Math.round((mx - fieldSize*0.5) / fieldSize),
        yIndex = Math.round((my - fieldSize*0.5) / fieldSize);
		     
	 	if(!endStateFlag){
       	if(boardArr[yIndex][xIndex] == ''){
        	drawMark(player, xIndex,yIndex);
        	boardArr[yIndex][xIndex] = player;
        	
	        	emptyFields--;
        	
        	if(checkEndingState(player,xIndex,yIndex)){
        	 	
				endStateFlag = endState(player);
        	}else {
	        	player = changePlayer(player);
				
				
        	}	
			



       	}} else {
       		init();
       	}
       
        

	}

	
	



}


 
