<template>
<div>
  <input v-model="searchValue" type="text" placeholder="Search">
  <h1 v-if="loading">Loading...</h1>
  <div v-for="dog in filteredDogs" :key="dog.id">
    <img alt="Dog photo" :src="dog.ImageUrl" width="250px"><h3>{{ dog.Name }} <small>{{dog.Age}}</small></h3>  - {{dog.Classifications.IsCatFriendly}}
    {{dog.Microchip}}<br>
    <span v-if="dog.Classifications.IsCatFriendly">Is cat friendly: {{dog.Classifications.IsCatFriendly}}</span>
  </div>

</div>
</template>

<script>
export default {
  name: "home",

  data(){
    return{
      myDogs:null,
      searchValue:'',
      loading:false
    }
  },
  computed: {
    filteredDogs(){
      let tempDogs = this.myDogs

      if(this.searchValue != '' && this.searchValue){
        tempDogs = tempDogs.filter((item) => {
          return item.Name
          .toUpperCase()
          .includes(this.searchValue.toUpperCase())})
      }
      return tempDogs

    }
  },
  methods: {},
  async created () {
    // fetch('http://gap.grv.org.au/api/apicall.php')
    this.loading = true;
    const response = await fetch("http://gap.grv.org.au/api/apicall.php");
    this.myDogs = await response.json();
    this.loading = false;

    console.log(this.myDogs)
  }
}
</script>

<style scoped>

</style>