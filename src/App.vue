<template>
  <div id="app">
    <div class="container">
    <p>
      All greyhounds adopted from GAP are de-sexed, vaccinated, microchipped,
      wormed and health checked. During the foster process, they quickly and
      easily make the transition from being racing animals to pets. The
      Victorian Government recently approved changes to the greyhound muzzling
      laws and effective 1 January 2019, greyhound pet owners can choose to have
      their greyhounds muzzle free in public.<br /><br /><b-badge
        >Note:</b-badge
      >
      Greyhounds who successfully pass the GAP program will continue to undergo
      a thorough temperament assessment to ensure they are safe around small
      dogs and okay to be muzzle free in public. <br /><br />GAP Source Number:
      <strong>BR 101124</strong>
    </p>

    <b-list-group>
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Child Tolerant"
          class="pull-left"
          src="/api/v2/img/IsChildFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />While most greyhounds are accepting of children, some enjoy their
        company more than others. This symbol indicates dogs that we feel are
        particularly suited to homes with children.</b-list-group-item
      >

      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Prefer Companion"
          class="pull-left"
          src="/api/v2/img/IsDogFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />Some greys are fine as an only dog, others need company. This symbol
        indicates that the greyhound would be happiest in a home with a canine
        friend to play with.</b-list-group-item
      >
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Cat Frendly"        
          class="pull-left"
          src="/api/v2/img/IsCatFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />This indicates that the greyhound is able to live with cats.
      </b-list-group-item>
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Livestock Tolerant"        
          class="pull-left"
          src="/api/v2/img/IsLivestockFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />Most of our dogs are not tested with livestock. This symbol indicates
        that the dog has been fostered with horses, cows etc and is comfortable
        around them.</b-list-group-item
      >
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Poultry Tolerant"        
          class="pull-left"
          src="/api/v2/img/IsPoultryFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />Most of our dogs are not tested with poultry. This symbol indicates
        that the dog has been fostered with poultry and is comfortable with
        them.</b-list-group-item
      >
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Small Dog Friendly"        
          class="pull-left"
          src="/api/v2/img/IsSmallDogFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />All our greyhounds are assessed with small dogs. Some of our greyhounds either play too roughly or retain some prey drive that means they may be unsafe to live with a small dog.</b-list-group-item
      >
      <b-list-group-item
        ><img
          v-b-tooltip.hover
          title="Apartment Friendly"        
          class="pull-left"
          src="/api/v2/img/IsApartmentFriendly.jpg"
          alt=""
          style="padding-top: 10px; padding-right: 10px"
        />Some greyhounds, due to their placid nature, adapt well to apartments and units. This symbol indicates greyhounds that we believe may be suitable for apartment living.</b-list-group-item
      >
    </b-list-group>
    <br>
    <p v-if="this.showSaveMsg"><img width="25px" src="/api/v2/img/loading.gif"> Loading...</p>
    <home @finishLoading="loadingStop" />
    </div>
  </div>
</template>

<script>
import home from "./components/home.vue";


export default {
  name: "App",
  components: {
    home,
  },
  data() {
    return {
      showSaveMsg: true,
    };
  },
  methods: {
    loadingStop() {
      this.showSaveMsg = false;
    },
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
