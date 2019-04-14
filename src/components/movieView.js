import React from 'react';

function MovieResult(props){
	return(
		<div onClick={function(){props.goToTrailer(props.data.id)}} id="movie-view" style={{'backgroundImage':`url("${props.data.img}")`}}>
			<div id="img-holder">
				
			</div>
				<div style={{'backgroundImage':`url("${props.data.img}")`}} id="text-holder2">
				</div>
			<div id="text-holder">
			
			<div>	
				<h1>{props.data.title}</h1>
				<p>Overview: {props.data.overview}</p>
				<p>Release date: {props.data.date}</p>
				<p>Rating: {props.data.rating}</p>
			</div>
			<div style={{'textAlign':'center'}}>
				<h2>CLICK TO SEE TRAILER</h2>
			</div>
			</div>

		</div>
		);
}
export default MovieResult;