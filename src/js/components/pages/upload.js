import React,{Component} from 'react'
import {connect}         from 'react-redux'
import {postNewFeed}     from '../../reducers'

class Upload extends Component{
 constructor(){
   super()
   this.state={
     id:0,
     category: ''
   }
 }
 componentDidMount(){
    let that=this
     $('#upload').append($.cloudinary.unsigned_upload_tag("vfcanmwr",
    { cloud_name: 'vicken' })).bind('cloudinarydone', function(e, data) {
      console.log('here is response',data.result.secure_url)
      var url = data.result.secure_url
      $('#preview').attr('src', url)
      $('#submitUpload').attr('disabled',false).click((e)=>{
        e.preventDefault()
        if( $('#location').val() ){
          that.props.dispatch({type:'ADD_NEW_FEED',feed:{id:Date.now(),link:url}})
          that.props.history.push('/')
          let newFeed= {categoryId: that.state.id, link:url}
          //post add to feeds, and post to server
          postNewFeed(newFeed)
        }else{
          $('#location').focus();
        }
      })
    }).bind('cloudinaryprogress', function(e, data) {
    var percent= Math.round((data.loaded * 100.0) / data.total) + '%' ;
      $('.progress_bar').css('width',percent).html(percent);
    });
 }

 handleChangeCtg(e){
   this.setState({...this.state, id : e.target.value})
 }
 handleChangeLct(e){
   this.setState({...this.state, category : e.target.value})
 }
 render(){
    let divStyle = {
      backgroundColor: 'green',
      height: '20px',
      width: '0px'
    };
    let options = this.props.categories.length>0 ?
    this.props.categories.map((category,i)=>{
      return <option value={category.id} key={i}>{category.category}</option>
    }) : '';
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
