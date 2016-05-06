import React,{Component} from 'react'

export default class Upload extends Component{
 componentDidMount(){
    let that=this
     $('#upload').append($.cloudinary.unsigned_upload_tag("vfcanmwr",
    { cloud_name: 'vicken' })).bind('cloudinarydone', function(e, data) {
      console.log('here is response',data.result.secure_url)
      $('#preview').attr('src',data.result.secure_url)
      //post add to feeds, and post to server
    }).bind('cloudinaryprogress', function(e, data) {
    var percent= Math.round((data.loaded * 100.0) / data.total) + '%' ;
      $('.progress_bar').css('width',percent).html(percent);
      $('#submitUpload').attr('disabled',false).click((e)=>{
        e.preventDefault()
        $('#location').val()? that.props.history.push('/') :
        $('#location').focus();
      })
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
       <label>location</label>
         <input type='text' required id='location'/>
         <button id='submitUpload' disabled>Submit</button>
     </div>
   )
 }
}
