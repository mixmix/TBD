import React,{Component} from 'react'
import {connect}         from 'react-redux'
import {postNewFeed}     from '../../reducers'

class Upload extends Component{
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
          //post add to feeds, and post to server
          //postNewFeed({link : url, categoryId: })
        }else{
          $('#location').focus();
        }
      })
    }).bind('cloudinaryprogress', function(e, data) {
    var percent= Math.round((data.loaded * 100.0) / data.total) + '%' ;
      $('.progress_bar').css('width',percent).html(percent);
    });
 }
 render(){
    let divStyle = {
      backgroundColor: 'green',
      height: '20px',
      width: '0px'
    };
    let options = this.props.categories.length>0 ?
    this.props.categories.map((category)=>{
      return <option value={category.id}>{category.category}</option>
    }) : '';
   return (
     <div>
       <form id='upload'>
       </form>
       <img src='' id='preview'/>
       <div class='progress_bar' style={divStyle}></div>
       <label>Category</label>
         <select ref='category'>
            {options}
         </select>
         <label>location</label>
         <input type='text' required id='location'/>
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
