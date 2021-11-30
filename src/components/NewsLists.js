import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form"
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import "./NewsLists.css"


const NewsLists = (props)=>{
    const{title,date,sentiment,publication,url} = props.article;
    const handleClick=(e,url)=>{
      props.handleBig(url);
    }
    return(<>
    
    <ListGroup.Item variant="secondary" 
    as="li"
    className="d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
    Date:{date && date.substring(0,10) }
    <Sentiments props={sentiment} />
      <div className="fw-bold">{title && title.substring(0,80)} </div>
      <div className="fw">{publication.toUpperCase()} <Button variant="outline-dark" size="sm" onClick={(e)=>handleClick(e,url)}>Read it</Button></div>
    </div>
    
  </ListGroup.Item>
  </>)
}

const Bigview=({dat,handleSentimentFilter,isHide,handleSourceFilter,deleteSourceFilter,handleCategoryFilter,deleteCategoryFilter})=>{
  const[text,setText]=useState("")
  const[catText,setCatText]=useState("")
  const [sentText,setSentText]=useState("")

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("source"))
    if(data!==null){
    setText(data.text)
    setCatText(data.catText)
    setSentText(data.sentText)}
  }, [])

  useEffect(() => {
    const values={text,catText,sentText}
    window.localStorage.setItem("source",JSON.stringify(values))
  })

  const handleSentiment=(e)=>{
    setSentText(e.target.value)
    handleSentimentFilter(e.target.value)  
  }
  const handleSource=()=>{
    console.log("changed",text)
    handleSourceFilter(text)
  }
  const deleteSource=()=>{
    setText("")
    deleteSourceFilter()
  }
  const handleCategory=()=>{
    handleCategoryFilter(catText)
  }
  const deleteCategory=()=>{
    setCatText("")
    deleteCategoryFilter()
  }
  return(
    <>{!isHide && <Form className="advanced-search-forms">
      <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Source_id</Form.Label>
      <Form.Control placeholder="Enter 1-5000" value={text} onChange={e=>setText(e.target.value)}/>
      <ButtonGroup size="sm" className="buttons" >
        <Button onClick={e=>{handleSource(e)}} variant="success"><AddRoundedIcon/></Button>
        <Button onClick={e=>{deleteSource(e)}} variant="danger"><DeleteRoundedIcon/></Button>
      </ButtonGroup>
    </Form.Group>

    <Form.Group  as={Col} className="mobile" controlId="formGridState">
      <Form.Label>Sentiment</Form.Label>
      <Form.Control type="text" placeholder={sentText} readOnly />
      <Form.Select onChange={(e)=>{handleSentiment(e)}} defaultValue="Sentiment Filters...">
      <option value="Select..">Select..</option>
      <option value="Positive" >Positive</option>
      <option value="Negative" >Negative</option>
      <option value="Neutral" >Neutral</option>
      </Form.Select>
    {/* <Button variant="success" size="sm" className="button-group" onClick={e=>handleSentiment()}>Add  </Button> */}
    </Form.Group>

    <Form.Group as={Col} className="mobile" controlId="formGridZip">
      <Form.Label>Category</Form.Label>
      <Form.Control placeholder="Enter 8 digit number" value={catText} onChange={e=>setCatText(e.target.value)}/>
      <ButtonGroup size="sm"  className="buttons">
        <Button variant="success" onClick={(e)=>handleCategory()}><AddRoundedIcon/></Button>
        <Button variant="danger" onClick={e=>deleteCategory(e)}><DeleteRoundedIcon/></Button>
      </ButtonGroup>
    </Form.Group>
  </Row>
    </Form>}
    
  <Card className="body">
      <h3 className="heading">{dat.title} </h3>
      <div id="date" className="ms-2 me-auto">
       <h6> Date: {dat.date && dat.date.substring(0,10)}</h6>
       <h6>Publication:{dat.publication}</h6>
      </div>
  <Card.Body className="contents">{dat.content}</Card.Body>
</Card></>)
}


const Sentiments = ({props}) => {
        if(props === "Positive"){return(
        <StarBorderRoundedIcon style={{color:'green'}}/>
        )}
        else if(props === "Neutral") {return(
        <StarBorderRoundedIcon style={{color:'grey'}}/>
        )}
        else {return(
        <StarBorderRoundedIcon style={{color:'red'}}/>
        )}

    }
    


export  {NewsLists,Bigview};