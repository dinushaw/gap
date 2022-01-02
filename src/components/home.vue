<template>
  <div class="container">
    <h1 v-if="loading"><img width="32px" src="/api/img/loading.gif" />Loading...</h1>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-4">
      <div class="feature col">
        <b-form-group
          label="Individual stacked checkboxes (default)"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox
            v-for="option in options"
            v-model="selected"
            :key="option.value"
            :value="option.value"
            :aria-describedby="ariaDescribedby"
            name="flavour-3a"
          >
            {{ option.text }}
          </b-form-checkbox>
        </b-form-group>
      </div>

      <div class="feature col">
        Search:
        <b-form-input v-model="searchValue" placeholder="Search"></b-form-input>
      </div>
    </div>

    <hr />
    
    <b-card-group columns>
      <b-card
        v-for="dog in filteredDogs"
        :key="dog.id"
        :img-src="dog.ImageUrl"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 100%"
        class="mb-6 shadow-sm"
        footer-tag="footer"
      >
        
      <b-card-title>{{dog.Name}}</b-card-title>
      <b-card-sub-title class="d-flex justify-content-between align-items-center">
        <div>{{dog.Age}} year(s) old </div>
        <div>
           <b-img
           id="IsChildFriendly"
            v-b-tooltip.hover
            title="Child Frendly"
            width="30"
            v-if="dog.Classifications.IsChildFriendly"
            src="http://gaptest.local:10008/api/img/IsChildFriendly.jpg"
            alt=""
            
          /> 
          <b-tooltip target="IsChildFriendly" title="Child Frendly"></b-tooltip>
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
            style="margin-right:5px"
          />
          </div>
      </b-card-sub-title>
      <b-card-text>
        {{dog.Description}}
      </b-card-text>
    

        <b-card-text>
          {{ dog.Description | truncate(150, "...") }}
        </b-card-text>

        <template #footer>
        <b-badge v-b-tooltip.hover title="Cat Frendly" variant="success" v-if="dog.Availability.indexOf('available for adoption now!') >-1 ">{{dog.Availability}}</b-badge>
        <b-badge variant="warning" v-if="dog.Availability.indexOf('home waiting') >-1 ">{{dog.Availability}}</b-badge>
        <b-badge variant="secondary" v-if="dog.Availability.indexOf('soon.') >-1 ">{{dog.Availability}}</b-badge>

        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      myDogs: null,
      searchValue: "",
      loading: false,
      selected: [], // Must be an array reference!
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" },
      ],
    };
  },
  computed: {
    filteredDogs() {
      let tempDogs = this.myDogs;

      if (this.searchValue != "" && this.searchValue) {
        tempDogs = tempDogs.filter((item) => {
          return item.Name.toUpperCase().includes(
            this.searchValue.toUpperCase()
          );
        });
      }
      return tempDogs;
    },
  },
  methods: {},
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