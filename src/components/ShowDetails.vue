<template>
  <div>
     <div  class="container-fluid topmargin">
          <div class="row">
            <div class="col-md-4">
             <img width="200" height="200" :src=showdetails.imgUrl  class="rounded float-left desImg"  alt="Responsive image">
            </div>
            <div class="col-md-8 showdes text-left">
              <h1>{{showdetails.name}}</h1>
              <span>{{showdetails.year}}</span><span class="dot"></span><span>{{showdetails.duration}}mins</span><span class="dot"></span><span v-for="(gen,i) in showdetails.genre" :key="i"><span>{{gen}}<span v-if=" i != showdetails.genre.length - 1" class="dot"></span></span></span>
              <p>{{showdetails.description}}</p>
            </div>
          </div>
     </div>


    <div class="container-fluid">
        <hr style="background-color:#ffffff">
        <div class="row">
             <div class="col-12">
                 <ul class="nav nav-tabs" role="tablist">
                     <li :style="!isCast ? { 'border': 'none' } : ''" @click="onCast()">Cast</li>
                     <li :style="isCast ? { 'border': 'none' } : ''" @click="onDetails()">Details</li>
                 </ul>
            </div>
        </div>
        <div style="padding-top:10px" v-if="isCast && cast.length>0" class="row">
          <div class="col-md-2 col-sm-4 col-xs-6"  v-for="(data,i) in cast" v-bind:key="i">
             <div style="text-align: -webkit-center;">
                 <template v-if="data.person.image"><img :src="data.person.image.original" class="rounded-circle" alt="Cinque Terre" width="100" height="100"> </template>
                 <template v-else><div class="rounded-circle" style="background-color:grey;height:100px;width:100px"></div></template>
                 <p class="namecast">{{data.person.name}}</p>
             </div>
           </div>
        </div>
        <div style="padding-top:10px;margin-left:15px" v-if="!isCast" class="row text-left">

                <div style="width: 20%; float:left;">
                   <p class="addndetails"> Creator</p>
                   <p class="addndetails"> Language </p>
                   <p class="addndetails"> OfficialSite</p>
                   <p class="addndetails"> Rating</p>
                   <p class="addndetails"> Country of origin</p>
                </div>
                <div style="width: 80%; float:right">
                   <p class="addndetails"> : {{showdetails.creator}}</p>
                   <p class="addndetails"> : {{showdetails.language}} </p>
                   <p class="addndetails"> : {{showdetails.officialSite}}</p>
                   <p class="addndetails"> : {{showdetails.rating}}</p>
                   <p class="addndetails"> : {{showdetails.countryOfOrigin}}</p>
                </div>

        </div>
    </div>




  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ShowDetails',
  data() {
    return {
       isCast : true,
        showdetails:{
            id : "",
            name : "",
            year : "",
            duration :"",
            genre : "",
            description:"",
            imgUrl : "",
            creator : "",
            language : "",
            officialSite :"",
            rating :"",
            countryOfOrigin :""
        },
        cast :[]
    }
  },
  created(){
    localStorage.setItem("routePath",this.$route.name);
    this.showdetails.id = this.$route.params.id
    this.getShowDetails(this.showdetails.id)
    this.getCastInfo(this.showdetails.id)
    this.getCreater(this.showdetails.id)
  },
   methods: {
        getShowDetails(id){
        axios.get(`https://api.tvmaze.com/shows/${id}`)
            .then(response => {
                this.showdetails.name = response.data.name
                this.showdetails.year = response.data.premiered
                this.showdetails.duration = response.data.runtime
                this.showdetails.genre = response.data.genres
                let des = response.data.summary.replace('<p>','');
                des = des.replace('</p>','');
                this.showdetails.description = des
                this.showdetails.imgUrl = response.data.image.original
                this.showdetails.language = response.data.language,
                this.showdetails.officialSite = response.data.officialSite,
                this.showdetails.rating = response.data.rating.average,
                this.showdetails.countryOfOrigin = response.data.network.country.name
            })
            .catch(e => {
                console.log(e)
             })
        },
        getCastInfo(id){
            axios.get(`https://api.tvmaze.com/shows/${id}/cast`)
            .then(response => {
                this.cast = response.data
            })
            .catch(e => {
                console.log(e)
             })
        },
        getCreater(id){
            axios.get(`https://api.tvmaze.com/shows/${id}/crew`)
            .then(response => {
                 this.showdetails.creator = response.data[0].person.name
            })
            .catch(e => {
                console.log(e)
             })
        },
        onCast(){
            this.isCast = true
        },
        onDetails(){
            this.isCast = false
        }
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
 font-family: fantasy;
 color: #f4f4f4;
}
h6{
 font-family: fantasy;
 color: black;
 margin-top:10px;
}
p{
 color: #f4f4f4;
 padding-top : 20px
}
.divShowDetails{
    background-color: #7ed6df;
    background-image: linear-gradient(315deg, #7ed6df 0%, #000000 74%);
}
.showdes{
    padding-top : 20px;
}
.desImg{
    margin:10px;
}
span{
color: #f4f4f4;
font-size:14px;
}

.nav-tabs {
    color : #ffffff !important;
    border-bottom : none !important
}
li{
   padding: 0px 10px;
    border-bottom: #3790a4;
    border-bottom: 2px solid #3790a4;
    cursor : pointer
}
.namecast{
    color:#ffffff;
    padding-top : 10px !important
}
.addndetails{
    color : #ffffff;
    padding-top : 0px !important;
    margin-bottom : 5px !important;
}
</style>
