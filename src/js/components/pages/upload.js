import React,{Component} from 'react'
import {connect}         from 'react-redux'
import {postNewFeed}     from '../../reducers'
import {_newPhoto}       from '../../actions'

class Upload extends Component{
  constructor(){
    super()
    this.state={
      id:0,
      category: ''
    }
  }
  componentDidMount(){
    // do this react way , don't use JQuery
    // let react do dom manipulation
    // there is this https://www.npmjs.com/package/cloudinary
    $('#upload').append($.cloudinary.unsigned_upload_tag("vfcanmwr",{ cloud_name: 'vicken' }))
                .bind('cloudinarydone', this.afterSavetoCloudinary.bind(this))
                .bind('cloudinaryprogress', this.uploadProgress);
 }
  afterSavetoCloudinary(e,data){
     let that=this
     var url = data.result.secure_url
     $('#preview').attr('src', url)
     $('#submitUpload').attr('disabled',false).click((e)=>{
       e.preventDefault()
       if( $('#location').val() ){
         that.props.dispatch(_newPhoto(url))
         that.props.history.push('/')
         let newFeed= {categoryId: that.state.id, link:url}
         //post add to feeds, and post to server
         postNewFeed(newFeed)
       }else{
         $('#location').focus();
       }
     })
 }
 uploadProgress(e,data){
   var percent= Math.round((data.loaded * 100.0) / data.total) + '%' ;
   $('.progress_bar').css('width',percent).html(percent);
   // do with state
 }
 updateCategoryState(e){  // use Category on Ctg
   this.setState({...this.state, id : e.target.value})
 }
 handleChangeLct(e){
   this.setState({...this.state, category : e.target.value})
 }
 render(){
   const divStyle = {
     backgroundColor: 'green',
     height: '20px',
     width: '0px'
   };

   let options = this.props.categories.map((category,i)=>{
     return <option value={category.id} key={i}>{category.category}</option>
   }) 

   return (
     <div id='uploadpage'>
       <form id='upload'>
       </form>
       <img src='' id='preview'/>
       <div class='progress_bar' style={divStyle}></div>
       <div class='inputfield'>
         <label>Category</label>
           <select onChange={this.handleChangeCtg.bind(this)}>
              {options}
           </select>
       </div>
         <div class='inputfield'>
           <label>location</label>
           <input type='text' required id='location' onChange={this.handleChangeLct.bind(this)}/>
         </div>
         <button id='submitUpload' disabled>Submit</button>
     </div>
   )
 }
}

export default connect((state)=>{
  return {
    categories : state.categories
  }
})(Upload)
