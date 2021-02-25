import {Component } from "react"
import "./textarea.css"

class Textarea extends Component {
    socket;
    room;
    constructor(props){

        super(props);
        this.socket=this.props.socket;
        this.room=this.props.room;
         this.socket.on('sendText',data=>{
            console.log("listened "+data)
            if(document.getElementById("area")!=null)
                        document.getElementById("area").value=data;
                    })

    }
 
componentDidMount=()=>{
   
}
change=(e)=>{
this.socket.emit('sendText',{
room:this.room,
data:e.target.value

})
console.log("sent "+e.target.value)
}

    render() { 
        return ( 
<div className="text">


<textarea style={{fontSize:"20px"}} id="area" onChange={this.change}>


</textarea>

</div>


         );
    }
}
 
export default Textarea;