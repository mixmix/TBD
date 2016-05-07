import React,{Component} from 'react'
import {connect}         from 'react-redux'

class Upload extends Component{
 componentDidMount(){
    let that=this
     $('#upload').append($.cloudinary.unsigned_upload_tag("vfcanmwr",
    { cloud_name: 'vicken' })).bind('cloudinarydone', function(e, data) {
      console.log('here is response',data.result.secure_url)
      var url = data.result.secure_url
      $('#preview').attr('src', url)
      //post add to feeds, and post to server
      $('#submitUpload').attr('disabled',false).click((e)=>{
        e.preventDefault()
        if( $('#location').val() ){
          that.props.dispatch({type:'ADD_NEW_FEED',feed:{id:Date.now(),link:url}})
          that.props.history.push('/')
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
   return (
     <div>
       <form id='upload'>
       </form>
       <img src='' id='preview'/>
       <div class='progress_bar' style={divStyle}></div>
       <label>Category</label>
         <select>
            <option value="ctg_1">Casual</option>
            <option value="ctg_2">Urban</option>
            <option value="ctg_3">Classic</option>
            <option value="ctg_4">Bussiness</option>
         </select>
         <label>location</label>
         <input type='text' required id='location'/>
         <button id='submitUpload' disabled>Submit</button>
     </div>
   )
 }
}

export default connect()(Upload)
