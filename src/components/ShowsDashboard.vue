<template>
  <div>
    <div class="container-fluid mrtop">
        <div class="row m-0">

            <div class="col-md-12 col-sm-12 col-xs-12 text-left" >
            <h4 class="showname">Most Rated & Recommanded</h4>
                <VueSlickCarousel style="text-align: -webkit-center;" v-if="highratedlist.length>0" v-bind="settings">

                    <div  v-for="val in highratedlist" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                         <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" id="imgId" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
         <div class="row m-0">
            <div class="col-md-12 col-sm-12 col-xs-12 text-left">
              <h4 class="showname">Action</h4>
                <VueSlickCarousel style="text-align: -webkit-center;" v-if="listAction.length>0" v-bind="settings">

                    <div  v-for="val in listAction" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                          <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
        <div class="row m-0">
            <div class="col-md-12 col-sm-12 col-xs-12 text-left">
             <h4 class="showname">Comedy</h4>
                <VueSlickCarousel style="text-align: -webkit-center;" v-if="listComedy.length>0" v-bind="settings">

                    <div  v-for="val in listComedy" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                          <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
        <div class="row m-0">
            <div class="col-md-12 col-sm-12 col-xs-12 text-left">
              <h4 class="showname">Drama</h4>
                <VueSlickCarousel style="text-align: -webkit-center;" v-if="listDrama.length>0" v-bind="settings">

                    <div  v-for="val in listDrama" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                          <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
        <div class="row m-0">
            <div class="col-md-12 col-sm-12 col-xs-12 text-left">
              <h4 class="showname">Romance</h4>
                <VueSlickCarousel style="text-align: -webkit-center;" v-if="listRomance.length>0" v-bind="settings">

                    <div  v-for="val in listRomance" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                          <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>

        <div class="row m-0">
            <div  class="col-md-12 col-sm-12 col-xs-12 text-left">
              <h4 class="showname">Sports</h4>
                <VueSlickCarousel style="margin-left:35px"  v-if="listSports.length>0" v-bind="settings">

                    <div  v-for="val in listSports" v-bind:key="val.id">
                        <div class="card" style="width: 18rem;">
                          <template v-if="val.image"><img @click="onShowClick(val.id)" :src="val.image.original" class="img-rounded rounded zoom" alt="Cinque Terre" width="100%" height="150"> </template>
                         <template v-else><div class="noimg">{{val.name}}</div></template>
                        </div>
                    </div>
                </VueSlickCarousel>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import axios from 'axios';
export default {
  name: 'ShowsDashboard',
  props: {
    msg: String
  },
  components: { VueSlickCarousel },
  data() {
    return {
      listAction : [],
      listRomance: [],
      highratedlist :[],
      listComedy :[],
      listDrama : [],
      listSports :[],
     settings :{
          "dots": false,
          "focusOnSelect": true,
          "infinite": true,
          "speed": 1000,
          "slidesToShow": 6,
          "slidesToScroll": 6,
          "touchThreshold": 5
        }
    }
  },
  created(){
      this.getList()
    },
   methods: {
     getList() {
         axios.get("https://api.tvmaze.com/shows")
        .then(response => {
            let list = response.data
            this.highratedlist = list.filter(e=>{
                return e.rating.average > 8.5
            })

            this.listAction = list.filter(e=>{
                return e.genres.includes("Action")
            })

            this.listComedy = list.filter(e=>{
                return e.genres.includes("Comedy")
            })

            this.listSports = list.filter(e=>{
                return e.genres.includes("Sports")
            })


            this.listDrama = list.filter(e=>{
                return e.genres.includes("Drama")
            })

            this.listRomance = list.filter(e=>{
                return e.genres.includes("Romance")
            })


        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    onShowClick(id){
        this.$router.push({name: 'ShowDetails', params: { id: id }})
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/*import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'*/
@import '../../node_modules/vue-slick-carousel/dist/vue-slick-carousel.css';
@import '../../node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css';
.card {
   width : 60%;
}
.noimg{
  height : 150px;
  background:#0f0f0f;
  color: #ffff;
}
.showname{
     margin: 20px 0 5px 40px
}

.zoom:hover {
   cursor: pointer;
  -ms-transform: scale(1); /* IE 9 */
  -webkit-transform: scale(1); /* Safari 3-8 */
   transform: scale(1);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
}
</style>
