function List(props){
    const deleteList=()=>{
        
    }
    return (
        <div className="list">
            <h3>{props.name}</h3>
            <div className="button-div">
            <button className="edit">✏️</button>
            <button className="delete" onClick={deleteList}>🗑️</button>
            </div>
           
        </div>
    )
}
export default List;