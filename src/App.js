import React from 'react';
import MovieResult from './components/movieView.js';
import ResultList from './data/ResultData.js';
import PopularMovieList from './data/popularMovie.js';
import HomePage from './components/homepage.js';
import './css/App.css';
import './css/all.css';
import axios from 'axios';
class App extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			view:"home",
			page:1,
			keyword:"",
			id:5,
			data:ResultList,
			popular:PopularMovieList,
			totalResult:0
		}
		this.searchMovie = this.searchMovie.bind(this);
		this.resultExport = this.resultExport.bind(this);
		this.nextpage = this.nextpage.bind(this);
		this.prevpage = this.prevpage.bind(this);
		this.loadPopularMovie = this.loadPopularMovie.bind(this);
		this.setViewHome = this.setViewHome.bind(this);
	}
	searchMovie(event){
		this.setState({loading:false});
		this.setState({
			view:"search"
		});
		ResultList.splice(0,ResultList.length);
		this.setState({data:ResultList});
		const {name,value} = event.target;
		if(value===""){
			this.setState({
				view:"popular"
			})
		}
		this.setState({
			[name] : value
		})
		this.resultExport();
		event.preventDefault();
	}
	loadPopularMovie(){
		PopularMovieList.splice(0,PopularMovieList.length);
		axios
		.get(`https://api.themoviedb.org/3/trending/movies/day?api_key=f5fb6615ec8d14f3d2476b1bf695e624&page=${this.state.page}`)
		.then(response=>{
			const data = response.data;

			for(let i = 0;i<data.results.length;i++){
				if(data.results[i].title!=null && data.results[i].poster_path!=null){
				PopularMovieList.push({id:data.results[i].id,title:data.results[i].title,overview:data.results[i].overview.substring(0,400)+"...",rating:data.results[i].vote_average,date:data.results[i].release_date,
									img:"https://image.tmdb.org/t/p/original"+data.results[i].poster_path});
				}
				this.setState({
					popular:PopularMovieList,
					loading:true,
					view:"popular"
				});
			}
		});
	}

	nextpage(){
		let currentPage = this.state.page;
		currentPage+=1;
		PopularMovieList.splice(0,PopularMovieList.length);
		ResultList.splice(0,ResultList.length);
		this.setState({
			page:currentPage
		})
		if(this.state.view==="popular"){
			this.loadPopularMovie();
		}else if(this.state.view==="search"){
			this.resultExport();
		}
	}

	prevpage(){
		let currentPage = this.state.page;
		if(currentPage>1){
			currentPage-=1;
		}else{
			currentPage=1;
		}
		PopularMovieList.splice(0,PopularMovieList.length);
		ResultList.splice(0,ResultList.length);
		this.setState({
			page:currentPage
		});
		if(this.state.view==="popular"){
			this.loadPopularMovie();
		}else if(this.state.view==="search"){
			this.resultExport();
		}
	}

	resultExport(){
		axios
		.get(`https://api.themoviedb.org/3/search/movie?api_key=f5fb6615ec8d14f3d2476b1bf695e624&page=${this.state.page}&query=${this.state.keyword}`)
		.then(response=>{
				const movie = response.data;
			this.setState({totalResult:movie.total_results});
			for(let i =0;i<movie.results.length;i++){
				if(movie.results[i].title!=null && movie.results[i].poster_path!=null){
				ResultList.push({id:movie.results[i].id,title:movie.results[i].title,overview:movie.results[i].overview.substring(0,103)+"...",rating:movie.results[i].vote_average,date:movie.results[i].release_date,
									img:"https://image.tmdb.org/t/p/original"+movie.results[i].poster_path});
				}
			}
			setTimeout(()=>{
			this.setState({
				data:ResultList,
				loading:true
			});},1000);
			
		});
	}
	goToTrailer(id){
		axios
		.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f5fb6615ec8d14f3d2476b1bf695e624&language=en-US`)
		.then(response=>{
			const data = response.data;
			const url = "https://www.youtube.com/watch?v="+data.results[0].key;
			window.open(
  				url,
  				'_blank'
			);
		})
		.catch(()=>{alert("We don't have trailer for that movie, so sorry.")})
		;
	}
	setViewHome(){
		this.setState({view:"home"});
		
	}
	showButton(){
		let button = document.getElementById('next-prev-button-holder');
		button.style.top="0px";
	}
	hideButton(){
		let button = document.getElementById('next-prev-button-holder');
		button.style.top="-30px";
	}
	render(){
		let result;
		if(this.state.view==="home"){
			return(<div>
						<div id="navbar" style={{'backgroundColor':'rgba(0,0,0,0.7)','border':'none','boxShadow':'none'}}>
							<div id="title-page" style={{'marginLeft':'-30px','marginTop':'-15px','fontSize':'25px'}}>
								<h1 onClick={this.setViewHome} style={{'cursor':'pointer'}}>PHILM PHIM</h1>
							</div>
						</div>
						<HomePage setViewHome={this.setViewHome} loadPopularMovie={this.loadPopularMovie}/>
					</div>
				);
		}else if(this.state.view ==="popular" && this.state.loading){
			 result = this.state.popular.map(popular=><MovieResult goToTrailer={this.goToTrailer} key={popular.id} data={popular}/>);
			 	return(
					<div>
						<div id="navbar">
							<div id="title-page">
								<h1 onClick={this.setViewHome} style={{'cursor':'pointer'}}>PHILM PHIM</h1>
							</div>
							<div id="search-bar-big">	
								<input placeholder="search" id="search-bar" type="text" onChange={this.searchMovie} value={this.state.keyword} name="keyword"/>
							 	<i className="fa fa-search"></i>
							 </div>
							<br/>
							
							<div id="next-prev-button-holder" onMouseOut={this.hideButton} onMouseOver={this.showButton}>	
								<div>
									<p onClick={this.prevpage}>
									PREV
									</p>
								</div>
								<div>
									<p onClick={this.nextpage}>
									NEXT
									</p>
								</div>
							</div>
							<p id="categories"><span style={{'cursor':'pointer'}} onClick={this.setViewHome}>Home</span> / <span onClick={this.loadPopularMovie} style={{'color':'#2ecc71','cursor':'pointer'}}>Popular Movie</span></p>
						</div>
						<div id="result-holder">	
							{result}
						</div>
					</div>
					)
			 }else if(this.state.view ==="popular" && !this.state.loading){
			 	return(
					<div>
						<div id="navbar">
							<div id="title-page">
								<h1 onClick={this.setViewHome} style={{'cursor':'pointer'}}>PHILM PHIM</h1>
							</div>
							<div id="search-bar-big">	
								<input placeholder="search" id="search-bar" type="text" onChange={this.searchMovie} value={this.state.keyword} name="keyword"/>
							 	<i className="fa fa-search"></i>
							 </div>
							<br/>
							
							<div id="next-prev-button-holder" onMouseOut={this.hideButton} onMouseOver={this.showButton}>	
								<div>
									<p onClick={this.prevpage}>
									PREV
									</p>
								</div>
								<div>
									<p onClick={this.nextpage}>
									NEXT
									</p>
								</div>
							</div>
							<p id="categories"><span onClick={this.setView} style={{'color':'#2ecc71','cursor':'pointer'}}>Home</span> / LOADING</p>
						</div>
					</div>
					)	
	
		}else if(this.state.view === "search" && this.state.loading){
			 result = this.state.data.map(data=><MovieResult goToTrailer={this.goToTrailer} data={data}/>);
			return(
					<div>
						<div id="navbar">
							<div id="title-page">
								<h1 onClick={this.setViewHome} style={{'cursor':'pointer'}}>PHILM PHIM</h1>
							</div>
							<div id="search-bar-big">	
								<input placeholder="search" id="search-bar" type="text" onChange={this.searchMovie} value={this.state.keyword} name="keyword"/>
							 	<i className="fa fa-search"></i>
							 </div>
							<br/>
							
							<div id="next-prev-button-holder" onMouseOut={this.hideButton} onMouseOver={this.showButton}>	
								<div>
									<p onClick={this.prevpage}>
									PREV
									</p>
								</div>
								<div>
									<p onClick={this.nextpage}>
									NEXT
									</p>
								</div>
							</div>
							<p id="categories"><span onClick={this.setViewHome} style={{'cursor':'pointer'}}>Home</span> / <span style={{'color':'#2ecc71'}}>{this.state.totalResult} Results </span></p>
						</div>
						<div id="result-holder">	
							{result}
						</div>
					</div>
			)	 
		}else if(this.state.view === "search" && !this.state.loading){
			return(
					<div>
						<div id="navbar">
							<div id="title-page">
								<h1 onClick={this.setViewHome} style={{'cursor':'pointer'}}>PHILM PHIM</h1>
							</div>
							<div id="search-bar-big">	
								<input placeholder="search" id="search-bar" type="text" onChange={this.searchMovie} value={this.state.keyword} name="keyword"/>
							 	<i className="fa fa-search"></i>
							 </div>
							<br/>
							
							<div id="next-prev-button-holder" onMouseOut={this.hideButton} onMouseOver={this.showButton}>	
								<div>
									<p onClick={this.prevpage}>
									PREV
									</p>
								</div>
								<div>
									<p onClick={this.nextpage}>
									NEXT
									</p>
								</div>
							</div>
							<p id="categories"><span onClick={this.setViewHome} style={{'cursor':'pointer'}}>Home</span> /<span style={{'color':'#2ecc71'}}> SEARCHING</span></p>
						</div>
					</div>
			)	 
		}
	
	}
}
export default App;
