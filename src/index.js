import React, {Component} from "react";
import ReactDOM,{ render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Container, Row, Col, Button} from "react-bootstrap";
import './index.css';
import logo from "./logo.svg";
import "./props.css";
import ReactHover from "react-hover";
import {FaHeart, FaDownload, FaBackward, FaArrowLeft, FaVoteYea, FaArrowUp, FaSearch} from "react-icons/fa";



const index = {
  baseURL:"/"
}

var i = 3

class Header extends React.Component{
  render(){
      return(
        <React.Fragment>
          <div className="header fixed">
              <a href={index.baseURL} className="logo abs">
                  <img src={logo} className="abs" />
              </a>
              <div className="searchBox abs">
                <input type="text" value="" placeholder="Search" className="query bl s15"/>
                <button className="send abs"><FaSearch/></button>
              </div>
              <ul className="nav abs ibl">
                <li>
                  <a href="#" className="s15 noul bl">Home</a>
                </li>
                <li>
                  <a href="#" className="s15 noul bl">User</a>
                </li>
              </ul>
          </div>
          <div className="hclr rel"></div>
        </React.Fragment>
      )
  }
}
const optionsCursorTrueWithMargin = {
  followCursor:false
}

   


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      currentMovie: null,
    }
}
  componentDidMount(){
    fetch('https://api.themoviedb.org/'+i+'/discover/movie?api_key=be144720a13ed6d6e6d76c36cbabf6e3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',{
      mode: 'cors',
    })
    .then(res => res.json())
    .then(json => {
        this.setState({
          isLoaded:true,
          items:json.results,
        })
      console.log(i)
    })
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
    fetch('https://api.themoviedb.org/'+i+'/discover/movie?api_key=be144720a13ed6d6e6d76c36cbabf6e3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then(res => res.json())
    .then(json => {
        this.setState({
          items:this.state.items.concat(json.results),
        })
        console.log(i)
    })
  }, 500);
};
movieInfo = (id) =>{
  console.log(id)
}

  viewInfo = (id) => {
    console.log(id);
    const filteredMovie = this.state.items.filter(item => item.id === id)
    console.log(filteredMovie)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
    this.setState({currentMovie: newCurrentMovie})
    console.log(this.state.currentMovie)
  }

  closeMovieInfo = () => {
    this.setState({currentMovie: null})
  }




  render() {
    let { isLoaded, items, currentMovie} = this.state;
    let overview = [""]
    console.log(items)
    var newCurrentMovie = [currentMovie]
    console.log(newCurrentMovie)
    items.map((i, id) => (
      overview[id]=(i.overview).substring(0,35)
    ))
    newCurrentMovie.map(i =>(
      console.log(i)
    ))
    if(!isLoaded){
      return (<h1>Loading</h1>);
    }
    else { 
    return (
      <Container>
     
      <div>
        {<Header />}
        { currentMovie === null ? 
          <div>
          <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <div className="feed">
        
          {items.map((i, id) => (
            <div className="ibl items ">
            <div  className="movies" key={id}
            
            onClick={()=>{
              this.viewInfo(i.id)
              window.scrollTo(0,0)
              console.log(i)
            }}
            >
            
            <ReactHover options={optionsCursorTrueWithMargin}>
            <ReactHover.Trigger type='trigger'>
            <img className="item-ph animate" 
            src={("http://image.tmdb.org/t/p/w300"+i.poster_path)}
            />
            </ReactHover.Trigger>
            <ReactHover.Hover type='hover'>
            <div>
              <i  className="like"><FaHeart/></i>
            </div>
              
              <div className="text-box">
              <p className="title"><b>{i.title}</b>: <br /><i>{overview[id]}...</i></p>
              </div>
              
            </ReactHover.Hover>
          </ReactHover>
              
            </div>
            </div>
          ))}
          
          </div>
        </InfiniteScroll>
          </div>
          : 
          <div>
          {<Header />}
          <div className="info">
            {newCurrentMovie.map((movie,id)=>(
              <div className="details">
              <div className="poster">
              <Button className="back abs" onClick={()=>{
                this.closeMovieInfo()
              }}><FaArrowLeft/></Button>
                <Button className="download abs"><FaDownload/></Button>
                <Button className="heart abs"><FaHeart/></Button>
                
                <img className="animate"
                src={("http://image.tmdb.org/t/p/w342"+movie.poster_path)}
                
            />
              </div>
              <div className="content">
                <div className="movie-title">
                <h1>{movie.title}</h1>
                </div>
                <div className="movie-desc">
                <h3><i>Overview:</i></h3><p>{movie.overview}</p>
                </div>
              </div>
              
      
              </div>
            ))}
          </div>
          <div>
          <InfiniteScroll
          dataLength={items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <div className="feed">
        
          {items.map((i, id) => (
            <div className="ibl items">
            <div  className="movies " key={id}
            
            onClick={()=>{
              window.scrollTo(0,0)
              this.viewInfo(i.id)
              console.log(i)
            }}
            >
            
            <ReactHover options={optionsCursorTrueWithMargin}>
            <ReactHover.Trigger type='trigger'>
            
            <img className="item-ph animate" 
            src={("http://image.tmdb.org/t/p/w154"+i.poster_path)}
            />
            </ReactHover.Trigger>
            <ReactHover.Hover type='hover'>
            <div>
              <i  className="like"><FaHeart/></i>
            </div>
              
              <div className="text-box">
              <p className="title"><b>{i.title}</b>: <br /><i>{overview[id]}...</i></p>
              </div>
              
            </ReactHover.Hover>
          </ReactHover>
              
            </div>
            </div>
          ))}
          
          </div>
        </InfiniteScroll>
          </div>
          </div>
        }
        
        <button className="addPin anim fixed">+</button>
      </div>
      </Container>
    );
          }
  }
}

render(<App />, document.getElementById("root"));
