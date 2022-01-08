<template>
  <div class="container">
    <h1 v-if="loading"><img width="32px" src="/api/img/loading.gif" />Loading...</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-4">
      <div class="feature col">

        <p><strong>Age &lt; {{ this.age_filter}}</strong>
        <b-form-input v-model="age_filter" placeholder="Select Age" type="range" min="1" max="15"></b-form-input></p>
        Showing <b-badge variant="light">{{filteredDogs.length}}</b-badge> results
        <!-- <b-form-group
          label="Individual stacked checkboxes (default)"
          >
          <b-form-checkbox
            v-for="option in age_options"
            v-model="age_filter"
            :key="option.value"
            :value="option.value"

            name="flavour-3a"
          >
            {{ option.text }}
          </b-form-checkbox>
        </b-form-group> -->

      </div>

      <div class="feature col">
        <b-form-group
          label="Clasifications"
        >
          <b-form-checkbox
            v-for="option in clasifications"
            v-model="clasifications_selected"
            :key="option.value"
            :value="option.value"

            name="flavour-3a"
          >
            {{ option.text }}
          </b-form-checkbox>
        </b-form-group>
      </div>

      <div class="feature col">
        <b-form-input v-model="searchValue" placeholder="Search by name"></b-form-input> <br>
        <b-button v-b-tooltip.hover title="Sort by Age" size="sm" variant="outline-primary" @click="sortedDogs"><b-icon icon="sort-down-alt" @click="sortedDogs" aria-hidden="true"></b-icon> </b-button>

      </div>
    </div>

    <hr />
    
    <!-- <b-card-group columns> -->
      <b-card no-body
        v-for="dog in filteredDogs"
        :key="dog.id"
        img-alt="Image"
        tag="article"
        class="overflow-hidden mb-3"
        footer-tag="footer"
      >
<b-row no-gutters>
    <b-col md="3">
        <!-- <b-card-img :src="dog.ImageUrl" alt="Image" class="rounded-0" fluid></b-card-img> -->
      <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    :interval="0"
    img-width="102"
    img-height="480"
  >
    <b-carousel-slide
      :img-src="dog.ImageUrl"
    ></b-carousel-slide>
        <b-carousel-slide
      :img-src="dog.ImageUrl"
    ></b-carousel-slide>
  </b-carousel>
      
      </b-col>




<!-- <button @click="showSingle">Show single picture.</button>
      <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="visible"
      imgs="dog.ImageUrl"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>  -->

<b-col md="9" class="p-4">
      <b-card-title>{{dog.Name}} 
         <small><b-badge style="" variant="success" v-if="dog.Availability.indexOf('available for adoption now!') >-1 ">Available</b-badge>
        <b-badge variant="warning" v-if="dog.Availability.indexOf('home waiting') >-1 ">{{dog.Availability}}</b-badge>
        <b-badge variant="secondary" v-if="dog.Availability.indexOf('soon.') >-1 ">{{dog.Availability}}</b-badge></small>


      </b-card-title>
      <b-card-sub-title class="d-flex justify-content-between">
        <div>{{dog.Age}} year(s) old </div>
        <div>
           <b-img
            v-b-tooltip.hover
            title="Child Frendly"
            width="30"
            v-if="dog.Classifications.IsChildFriendly"
            src="http://gaptest.local:10008/api/img/IsChildFriendly.jpg"
            alt="" 
            class="mr-2"
          /> 
        
          <b-img
            v-b-tooltip.hover
            title="Dog Frendly"
            width="30"
            v-if="dog.Classifications.IsDogFriendly"
            src="http://gaptest.local:10008/api/img/IsDogFriendly.jpg"
            alt=""
            style="margin-right:5px"
          />
          <b-img
            v-b-tooltip.hover
            title="Cat Frendly"
            width="30"
            v-if="dog.Classifications.IsCatFriendly"
            src="http://gaptest.local:10008/api/img/IsCatFriendly.jpg"
            alt=""
            
          />
          </div>
      </b-card-sub-title>
      <b-card-text>
       <p> Racing Name: {{dog.RacingName ? dog.RacingName : 'Never Raced'}} <br>
           Microcip No: {{dog.Microchip ? dog.Microchip : 'N/A'}}  

       </p>
       <p> </p>
        <!-- {{dog.Description}} -->
      </b-card-text>
    

        <b-card-text>
          <!-- <span v-if="!read_more[dog.Name]"> {{ dog.Description | truncate(150, "...") }} </span>
          <span v-if="read_more[dog.Name]"> {{ dog.Description }} </span>
          <b-link href="#foo" @click="showMore(dog.Name)" v-if="!read_more[dog.Name]" class="btn btn-primary">Show more</b-link>
          <b-link @click="showLess(dog.Name)" v-if="read_more[dog.Name]" class="btn btn-primary">Show less</b-link> -->
          <truncate action-class="customClass" clamp="Show more" :length="90" less="Show Less" type="text" :text="dog.Description"></truncate>
        </b-card-text>

        <template #footer>
          {{dog.Availability}}
        

        </template>
       </b-col> 
       </b-row>
      </b-card>
    <!-- </b-card-group> -->
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      myDogs: null,
      searchValue: "",
      age_filter:15,
      loading: true,
      selected: [], // Must be an array reference!
      age_options: [
        { text: "0-1 yr olds", value: "1" },
        { text: "1-2 yr olds", value: "2" },
        { text: "2-3 yr olds", value: "3" },
        { text: "3-4 yr olds", value: "4" },
      ],
      clasifications: [
        { text: "IsChildFriendly", value: "IsChildFriendly" },
        { text: "IsDogFriendly", value: "IsDogFriendly" },
        { text: "IsCatFriendly", value: "IsCatFriendly" },
        { text: "IsPoultryFriendly", value: "IsPoultryFriendly" },
      ],
      clasifications_selected: [],
      read_more: {},

    };
  },
  computed: {
    filteredDogs() {
      let tempDogs = this.myDogs;

      if(this.age_filter>0){
        tempDogs = tempDogs.filter((item) => {
          return ((item.Age >0 && item.Age <= this.age_filter)? item : '') //re write this
        }
        );
      }

      if (this.searchValue != "" && this.searchValue) {
        tempDogs = tempDogs.filter((item) => {
          return item.Name.toUpperCase().includes(
            this.searchValue.toUpperCase()
          );
        });
      }

      if(this.clasifications_selected){
        tempDogs= tempDogs.filter(item => this.clasifications_selected.every(selection => item['Classifications'][selection]===true))
      }
      // this.myDogs = tempDogs
      return tempDogs;
    },

  },
  methods: {
    sortedDogs(){
      let tempDogs = this.filteredDogs
      function compare(a, b) {
        if (a.Age < b.Age)
          return -1;
        if (a.Age > b.Age)
          return 1;
        return 0;
      }
      this.myDogs = tempDogs
      return tempDogs.sort(compare)
    },
    showMore(Name) {
        this.$set(this.read_more, Name, true);
    },
    showLess(Name) {
        this.$set(this.read_more, Name, false);
    },

  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  async created() {
    // fetch('http://gap.grv.org.au/api/apicall.php')
    this.loading = true;
    //const response = await fetch("http://gap.grv.org.au/api/apicall.php");
    const response = await fetch("http://gaptest.local/api/apicall.php");

    this.myDogs = await response.json();
    this.loading = false;

    console.log(this.myDogs);
  },
};
</script>

<style scoped>
</style>