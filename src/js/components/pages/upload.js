import React,{Component} from 'react'

export default class Upload extends Component{
 componentDidMount(){
   let that=this
   $('#upload').append($.cloudinary.unsigned_upload_tag("vfcanmwr",
  { cloud_name: 'vicken' })).bind('cloudinarydone', function(e, data) {
    console.log('here is response',data.result.secure_url)
    $('img').attr('src',data.result.secure_url)
    //post add to feeds, and post to server
  })

 }
 render(){
   return (
     <div>
       <form id='upload'>
       </form>
       <img src='' />
     </div>
   )
 }
}
