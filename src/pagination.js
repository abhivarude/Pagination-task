
import "./main.css"
const Pagiantion11=({postsPerPage,totalPosts,paginate})=>{

                    const pagenum=[];

                    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++)
                    {
                        pagenum.push(i);
                    }

                    return(
<div className="container">
<div className="navi">

<nav>

<ul className="pagination">

    {
        pagenum.map( (number)=>{
        return(
            <div>
              <li><button  onClick={()=>{paginate(number)}} className="btn btn-dark">{number}</button></li>  
            </div>
        )



        })
    }
</ul>
</nav>

</div>


</div>

                      
                    )



}

export default Pagiantion11;