// import { useEffect ,useState} from "react"
import axios from "axios";
import  Pagiantion11 from "./pagination";   

// export default function Main(){
import "./main.css"
import { Component } from "react";
const API_URL="https://jsonplaceholder.typicode.com/posts";

export default class Main extends Component{

constructor(){
    super();
    this.state={
        webdata:[],
        UserId:"",
        Title:"",
        Body:"",
        dataid:"",
        
        postperpage:10,
     
        currentpost:[],
        status:"",
        datastatus:""

    }
}
componentDidMount(){


    this.apicall();
    this.paginate();


  }

 apicall=async()=>{
    let data=await axios.get(API_URL);
    this.setState({webdata:data.data});
   
    this.setState({status:true})
    
  
}

deletedata= async(id)=>{




axios.delete(`${API_URL}/${id}`);
let posts=[...this.state.currentpost];
posts=posts.filter((post)=>post.id!==id);
this.setState({currentpost:posts})
}


handlechange=async({target:{name,value}})=>{

  this.setState({[name]:value});
 


}



updatepost=async()=>{
const {data}=await axios.put(`${API_URL}/${this.state.dataid}`,{ UserId:this.state.UserId,  title:this.state.Title,  body:this.state.Body})
              let posts=[...this.state.currentpost];
              const postindex=posts.findIndex(post=> post.id===this.state.dataid)
              posts[postindex]=data;
              // console.log(data);
              this.setState({currentpost:posts , UserId:"",  Title:"",  Body:"", dataid:""})
              alert("Post Updated");
         
}

handleSubmit=async(evt)=>{
  evt.preventDefault();

  if(this.state.dataid)
  {
this.updatepost();


  }else{

  const {data}=await axios.post(API_URL,{ UserId:this.state.UserId,  title:this.state.Title,  body:this.state.Body})
  let posts=[...this.state.currentpost];
  posts.push(data);
  this.setState({currentpost:posts})
  alert("Post Inserted")
  // console.log(data);
  }
}

selectpost=(pos)=>{


this.setState({
  dataid:pos.id,
  UserId:pos.id,
  Title:pos.title,
  Body:pos.body

})


}


paginate=(num)=>{
  
 this.setState({currentpost:[]})
  this.setState({currentpage:num})



let indexoflastpost=(num*this.state.postperpage);
let indexoffirstpost=(indexoflastpost-this.state.postperpage);

let current=this.state.webdata.slice(indexoffirstpost,indexoflastpost);
// current.slice(0,10);


this.setState({currentpost:current})

}

showdata=()=>{
  this.setState({datastatus:true})
  this.paginate(1);
}

render(){
    return(<>
    
    <div className="container">
  <div className="sform">

<form>
<h3   class="form-label">INSERT AND UPDATE POSTS</h3>

  <div class="mb-3">
    <label class="form-label">UserId</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.handlechange } name="UserId" value={this.state.UserId}/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Title</label>
    <input type="text" class="form-control" id="exampleInputPassword1"onChange={this.handlechange } name="Title" value={this.state.Title} />
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Body</label>
    <input type="text" class="form-control" id="exampleInputPassword1" onChange={this.handlechange } name="Body" value={this.state.Body}/>
  </div>
  
  <button onClick={this.handleSubmit} class="btn btn-primary">Submit</button>
</form>

</div>

  </div>



<div className="container">
<div className="row">



    {
    
    this.state.currentpost.map((ele)=>{
        return(<>
        <div className="col-3">
        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{ele.id}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ele.title}</h6>
    <p className="card-text">{ele.body}</p>
              
    <button className="btn btn-primary" id="se" onClick={()=>{this.selectpost(ele)}} >Update</button>
        <button className="btn btn-primary" onClick={()=>{this.deletedata(ele.id)}} >Delete</button>
 
</div>

</div>




       
        </div>
           
      
      
      </>
        )
    })
    
    
    }
  
  </div>
  {
   this.state.datastatus?
    <Pagiantion11 postsPerPage={this.state.postperpage} totalPosts={this.state.webdata.length} paginate={this.paginate}></Pagiantion11>:
    
    <div className="container">

    <button className="btn btn-primary" id="exampleInputPassword1" onClick={this.showdata}>Show Posts</button>
    <p>Click above button to view all posts</p>
  
  
   
      
   
    </div>
    
    
  }

  

 
   
</div>
  
     
    </>)
}


}