import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const CardList=(props)=>(
  <div> {props.profiles.map(profile => <Card {...profile}/>)}</div>);

class  Card extends Component{
  render(){
    const profile = this.props;
    
    return (
      <div className="card-wrap">
      <img  className="img9" src={profile.avatar_url}/> 
      <div className="info">
      <div className="name">{profile.name}</div>
      < div className="company">{profile.company}
      </div>  
    </div>
    </div> 
    );
   }
}
class Form extends Component{
 
  state={userName:''};
  handleSubmit= async (event)=>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data)
    this.setState({userName:''});
    
  };  

  render() {
  	return (
      <form onSubmit={this.handleSubmit}>
    	  <input type="text" value = {this.state.userName} onChange = {event=>this.setState({userName:event.target.value})}placeholder="GitHub username" required/>
        <button>Add card</button>
    	</form>
      
    );
  }
}
class App extends Component{
  state ={
    profiles:[],
  };

addnewprofile=(profdata)=>{
    this.setState(prevstate=>({
      profiles:[...prevstate.profiles,profdata],
    }));
  };
  render(){
    return (<div>
      <Form onSubmit={this.addnewprofile}/>
      <CardList profiles={this.state.profiles}/>
      </div>
      );
  }
} 

export default App;
