import React,{useState,useEffect } from 'react';
import Form from "react-bootstrap/Form";


const SearchForm = ({handleSearch}) => {
    const [text, setText] = useState("");
    const handleSubmit = (e)=>{
      
          console.log("dekho",text)
      console.log(typeof(handleSearch))
      handleSearch(text)
      e.preventDefault();
       
    }

    useEffect(() => {
      setText(JSON.parse(window.localStorage.getItem("text")))
    }, [])


    useEffect(() => {
      window.localStorage.setItem("text",JSON.stringify(text))
    }, )
    
    return (
      <>
        <form className="search-forms" onSubmit={(e)=>handleSubmit(e)} >
        <Form.Control style={{width:"90%"}} placeholder="search here" value={text} onChange={e=>setText(e.target.value)}/>
        </form>
        </>
    )
}

export default SearchForm;
