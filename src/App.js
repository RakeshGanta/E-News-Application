
import React,{useState,useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NewsLists,Bigview} from "./components/NewsLists";
import "react-datepicker/dist/react-datepicker.css";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const App=()=> {
  const[Loading,isLoading] = useState(false);
  const[docs,setDocs]=useState([]);
  const[isHide, setIsHide]=useState(true);
  const[term,setTerm]=useState("politics");
  const[startDate,setStartDate]=useState("2021-11-01")
  const[endDate,setEndDate]=useState("2021-11-20")
  const[url,setUrl]=useState("")
  const[BigView,setBigView]=useState({});
  const[updatedUrl ,setUpdatedUrl]=useState(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`);
  const[updatedStore,setUpdatedStore]=useState([])
  const [docStorage,setDocStorage] =useState([])
  const[senti,setSenti]=useState();
  const[sourceId,setSourceId]=useState()
  const[categoryId,setCategoryId]=useState()
  const[count,setCount]=useState(0)
  const[active,setActive]=useState({
       sent:false, source:false , category:false
  })
  const[name,setName]=useState(false)
  
//1. Main useEffect function to fetch data from api.
  useEffect(() => {
    
    const fetchNews = async ()=>{
    try {
    
        const res = await fetch(url)
        const articles = await res.json()
        setDocs(articles.result.data);
        if(articles.result.data.length===0){
          isLoading(false)
          setBigView({})
          alert("No records found")}
        else{
        console.log("count",articles.result.count)
        const nextURL = articles.result.nextUrl.substring(40,500)
        setUpdatedUrl(nextURL)
        setDocStorage([articles.result.data])
        setBigView(articles.result.data[0]);
        isLoading(false);
        setCount(count+1)
        
        }
      } 
     catch (error) {
      console.log(error)  
    }
  }
  fetchNews()
  const Changed=url.slice(40,-43)
  window.history.replaceState("mypage","boooom",Changed);
  isLoading(true)
  }, [url])
  
// useEffect function to get local stored data so that filters won't change even after refreshing the page
   useEffect(() => {
    const formData=JSON.parse(window.localStorage.getItem("Booom"))
    if(formData===null){
      console.log("Nulll")
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`) 
    }
    if(formData!==null){
    if(formData.url.length===0){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }else{
    setUrl(formData.url)
    setTerm(formData.term)
    setActive(formData.active)
    setIsHide(formData.isHide)
    setSenti(formData.senti)
    setSourceId(formData.sourceId)
    setCategoryId(formData.categoryId)
    setStartDate(formData.startDate)
    setEndDate(formData.endDate)}}
  }, [])

  // useEffect function to store data into local storage. 
   useEffect(() => {
    const valuesToSave = {url,isHide,startDate,endDate,senti,sourceId,categoryId,active,term}
    window.localStorage.setItem("Booom",JSON.stringify(valuesToSave))
  })
  
//function to handle whenever the user uses the search form
  const handleSearch = (term)=>{
    setTerm(term)
    if(active.sent===true && active.source===true && active.category===true){
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&sentiment=${senti}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&categort_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    else if(active.sent===true && active.source===true){
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&sentiment=${senti}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      } 
    else if(active.sent===true && active.category===true){
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&sentiment=${senti}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      } 
    else if(active.category===true && active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    else if(active.sent===true){
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      } 
    else if(active.source===true){
       setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }   
    else if(active.category===true){
      setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }  
    else{
    setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)    
  }
    console.log("aaaa",term)
  }
  
 //function to set the right side big view of news component 
  const handleBig =(url)=>{
    const newItem = docs.filter(doc=>doc.url===url)
    setBigView(newItem[0])
  }

  //function to hide and show advanced filters
  const handleHide=()=>{
    setIsHide(!isHide)
  }

  //function to handle to see the next list of news on left side 
  const handlePageChange=async ()=>{
    isLoading(true)
    if (!(updatedStore.includes(updatedUrl))){
      updatedStore.push(updatedUrl)
    }    
    const res=await fetch(`https://get.scrapehero.com/news-api/news/${updatedUrl}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`);
    const doc = await res.json();
    setDocs(doc.result.data)
    if(doc.result.data.length===0){
          isLoading(false)
          setDocs(docStorage[docStorage.length-1])
          alert("No records found")}
        else{

    setBigView(doc.result.data[0])
    setDocStorage([...docStorage,doc.result.data])
    isLoading(false)
    const nextURL = doc.result.nextUrl.substring(40,500)
    updatedStore.push(nextURL)
    setUpdatedUrl(nextURL)}

  }

  //function to see previous list of news
  const handlePrevChange= ()=>{
    
    if(docStorage.length>1){
      setDocs(docStorage[docStorage.length-2])
      docStorage.pop()
      setUpdatedUrl(updatedStore[updatedStore.length-2])
      updatedStore.pop()
      setDocStorage([...docStorage])
     }
    }
  //function to apply the sentiment filter  
  const handleSentimentFilter =(senti)=>{
      setSenti(senti)
      active.sent=true
      setActive(active)
      if(senti==="Select.."){
        active.sent=false
        setActive(active)
        if(active.category===true && active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
         }
        else if(active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
         }
        else if(active.category===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
         } 
        else{
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
        } 
      }else{
      if(active.sent===true && active.source===true && active.category===true){
      setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&source_id=${sourceId}&categort_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
      else if(active.sent===true && active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
      else if(active.sent===true && active.category===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
      else if(active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    }
      
  }

  //function to apply SourceId filter
  const handleSourceFilter=(sourceId)=>{
    setSourceId(sourceId)
    if(sourceId.length===0){alert("You either left it empty")}
    else{
      try {
    active.source=true
    setActive(active)
    if(active.sent===true && active.source===true){
      setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
      else if(active.category===true && active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
      else if(active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
       } catch (error) {
        console.log("error occured")
        return(<h1>No records found</h1>)
      }
    }
    }
  const deleteSourceFilter=()=>{
    active.source=false;
    setActive(active)
    if(active.category===true && active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)  
      }
  else if(active.category===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
  else if(active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
  else{
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }    
  }

  //Function to apply CategoryId filter
  const handleCategoryFilter =(categoryId)=>{
    setCategoryId(categoryId)
    if(categoryId.length<=8){alert("Please enter value of 8 characters")}
    else{
    active.category=true
    setActive(active)
    if(active.category===true && active.source===true){
      setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    else if(active.category===true && active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    else if(active.category===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
    }
  }
  const deleteCategoryFilter =()=>{
    active.category=false;
    setActive(active)
    if(active.source===true && active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&category_id=${categoryId}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)  
      }
  else if(active.source===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&source_id=${sourceId}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
  else if(active.sent===true){
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&sentiment=${senti}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
  else{
        setUrl(`https://get.scrapehero.com/news-api/news/?q=${term}&start_date=${startDate}&end_date=${endDate}&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
      }
  }

  const handleDateSubmit =()=>{
    handleSearch()
  }
  //Function to view and hide left side components .
  const handleName=()=>{
    setName(!name)
   }
  
  return (
    <section>
    <Header handleSearch={handleSearch} handleHide={handleHide} handleName={handleName} />
    <div className="content">
    <div className="left" id={name===true && "listss"}>
    <Container class="date" >
     <Form.Group as={Col}  controlId="formGridZip">
      <Form.Label>Start Date:</Form.Label>
      <Form.Control style={{width:'95%'}} type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
      <Form.Label>End Date:</Form.Label>
      <Form.Control style={{width:'95%'}} type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
      <Button className="submit-btn" size="sm"  variant="primary" onClick={e=>handleDateSubmit()} >Add Dates</Button>
    </Form.Group>
      </Container>
    {
      
      Loading ? (<h1>Loading...</h1>) : 
      <>
        <ListGroup as="ol" numbered>
        
           {docs.map((article,index) => {return (<NewsLists article={article} key={index}  handleBig={handleBig} />) })}
           <div>
          <ButtonGroup size="sm" className="page-btn">
            <Button onClick={handlePrevChange} variant="success"><ArrowBackIosIcon/></Button>
            <Button onClick={handlePageChange}variant="danger"><ArrowForwardIosIcon/></Button>
          </ButtonGroup>
        </div>
        </ListGroup>

        
    </>
      
    }
    </div>
    <div className="right" id={name===true&&"rights"}>
      <Bigview 
      dat={BigView}
      handleSentimentFilter={handleSentimentFilter}
      isHide={isHide}
      handleSourceFilter={handleSourceFilter}  
      deleteSourceFilter={deleteSourceFilter}
      handleCategoryFilter={handleCategoryFilter}
      handleSearch={handleSearch}
      deleteCategoryFilter={deleteCategoryFilter}
      />

    </div>
    </div>
    </section>
  )
}


export default App;
