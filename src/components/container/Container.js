import {Component} from "react"
import Board from "../board/Board"
import "./container.css"
import io from "socket.io-client"
import Textarea from "../TextArea/Textarea";
class Container extends Component {

    socket=io.connect("https://socket-server-rj.herokuapp.com")
   constructor(props){

super(props);
this.state={

    room:"",
    t:0,
    val:"",
    logged:false,
    color:'#000000'
    
}
this.socket.on('err',data=>{
    document.getElementsByClassName("radiobtn")[0].style.display="none"
    this.setState({logged:false})
    alert(data);
})

this.socket.on('success',(d)=>{

    document.getElementsByClassName("radiobtn")[0].style.display="block"
    this.setState({logged:true})
    alert("Success.Now you can collaborate with your friends")
})

   }
   
  

create=()=>{


    this.setState({t:1})
    this.setState({logged:true})
    let m=Date.now().toString();
this.setState({room:m})
    this.socket.emit('create',m)
    alert("Your room id is "+m+" share this with your friends")
 document.getElementsByClassName("radiobtn")[0].style.display="block"   
}
option=(e)=>{

this.setState({val:e.target.value})
}
join=()=>{
this.socket.emit('join',this.state.room);
   

}
change=(e)=>{

    this.setState({
        room:e.target.value
    })
}
leave=()=>{
this.setState({logged:false,val:""});
document.getElementsByClassName("radiobtn")[0].style.display="none"
 
}
    render() { 
        return (  
<div className="container">

<div className="color-picker-container">


<input type="text" onChange={this.change}></input>

<button onClick={this.join}>Join</button>
<div >
    <div class="create">
        {!this.state.logged?<button style={{right:"0px",left:"auto"}} onClick={this.create}>Create</button>:
          <button style={{right:"0px",left:"auto"}} onClick={this.leave}>Leave</button>
        }
  
    </div>
    <div class="radiobtn">
<input type="radio" id="text" name="text" value="text"checked={this.state.val==='text'} onChange={this.option}></input>
<label style={{color:"red"}} for="text">Text Mode</label>
<input type="radio" id="Board" name="board" value="board" checked={this.state.val==='board'} onChange={this.option}></input>
<label style={{color:"red"}} for="board">Board Mode</label>
</div>


</div>
</div>

<div className="board-container">
    {this.state.val==="board"?
<Board socket={this.socket} room={this.state.room} color={this.state.color}/>:this.state.val=="text"?<Textarea socket={this.socket} room={this.state.room} color={this.state.color}/>:null

    }
</div>

</div>




        );
    }
}
 
export default Container;