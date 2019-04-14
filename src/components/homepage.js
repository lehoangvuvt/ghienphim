import React from 'react';

function HomePage(props){
	
	return(
		<div id="homepage-main">
			<iframe title="lastest-trailer" id="utube-player" autoPlay width="760" height="515
			" src="https://www.youtube.com/embed/TcMBFSGVi1c?controls=0&&autoplay=1" 
			frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
			allowfullscreen></iframe>
			<div id="poster">
			</div>
			<div id="link-holder">
				<div 
				onClick={()=>{props.setViewHome()}}
				onMouseOver={()=>{
					let small = document.getElementById('small-link-div');
					let text = document.querySelector('#text');
					small.style.background='#2ecc71';
					text.style.letterSpacing='3px';	
					text.style.color="black";
				}}
				onMouseOut={()=>{
					let text = document.querySelector('#text');
					text.style.letterSpacing='0.5px';	
					text.style.color="white";	
				}}
				style={{'backgroundColor':'#2ecc71','borderTop':'4px solid white'}}
				id="small-link-div">
				
					<h1 id="text">HOME</h1>	
				</div>

				<div
				onClick={()=>{props.loadPopularMovie()}} 
				onMouseOver={()=>{
					let small = document.getElementById('small-link-div2');
					let text = document.querySelector('#text2');
					small.style.background='#2ecc71';
					text.style.letterSpacing='3px';	
					text.style.color="black";
				}}
				onMouseOut={()=>{
					let small = document.getElementById('small-link-div2');
					let text = document.querySelector('#text2');
					small.style.background='#141414';
					text.style.letterSpacing='0.5px';	
					text.style.color="white";	
				}}
				id="small-link-div2">
				
					<h1 id="text2">POPULAR MOVIES</h1>	
				</div>

				<div
				onClick={()=>{props.loadPopularMovie()}}  
				onMouseOver={()=>{
					let small = document.getElementById('small-link-div3');
					let text = document.querySelector('#text3');
					small.style.background='#2ecc71';
					text.style.letterSpacing='3px';	
					text.style.color="black";
				}}
				onMouseOut={()=>{
					let small = document.getElementById('small-link-div3');
					let text = document.querySelector('#text3');
					small.style.background='#141414';
					text.style.letterSpacing='0.5px';	
					text.style.color="white";	
				}}
				id="small-link-div3">
				
					<h1 id="text3">POPULAR MOVIES</h1>	
				</div>


			</div>
		</div>
		);
}
export default HomePage;