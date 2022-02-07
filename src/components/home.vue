<template>
  <div>
    <div class="row g-4 pt-5 pb-3 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <p>
          <strong>Age &lt; {{ this.age_filter }}</strong>
          <b-form-input
              v-model="age_filter"
              placeholder="Select Age"
              type="range"
              min="1"
              max="15"
          ></b-form-input>
        </p>
        <b-button
            v-b-tooltip.hover
            title="Sort by Age"
            size="sm"
            variant="outline-primary"
            @click="sortedDogs"
        >
          <b-icon
              icon="sort-down-alt"
              @click="sortedDogs"
              aria-hidden="true"
          ></b-icon>
          Sort by Age
        </b-button>
      </div>

      <div class="feature col">
        <b-form-group>
          <b-form-checkbox
              v-for="option in classifications"
              v-model="classifications_selected"
              :key="option.value"
              :value="option.value"
              name="flavour-3a"
          >
            {{ option.text }}
          </b-form-checkbox>
        </b-form-group>
      </div>

      <div class="feature col">
        <b-form-input
            v-model="searchValue"
            placeholder="Search by name"
        ></b-form-input>
        <br/>
        <b-form-checkbox v-model="never_raced" key="Never Raced"
        >Never Raced
        </b-form-checkbox
        >
        <b-form-checkbox v-model="home_waiting" key="Never Raced">
          Exclude 'home waiting' dogs
        </b-form-checkbox
        >
      </div>
    </div>
    <b-badge variant="light">{{ filteredDogs.length }}</b-badge>
    <span v-if="filteredDogs.length > 1 || filteredDogs.length === 0"
    >dogs
    </span>
    <span v-if="filteredDogs.length === 1">pooch </span>matching your selection
    <hr/>

    <b-card
        no-body
        v-for="dog in filteredDogs"
        :key="dog.id"
        :img-alt="dog.Name"
        tag="article"
        class="overflow-hidden mb-3"
        footer-tag="footer">
      <b-row no-gutters>
        <b-col md="3">
          <b-link
              class="mx-auto"
              v-if="dog.GapMediaLinks.length >0"
              variant="success"
              v-b-modal="'DogModal'"
              user="'item'"
              @click="sendInfo(dog)">
            <img
                v-lazy="dog.ImageUrl || dog.ImageUrl"
                style="width: 100%"/>
            <div class="d-flex flex-row bd-highlight mb-3 flex-wrap">
              <span
                  v-for="dogImage in dog.GapMediaLinks"
                  :key="dogImage.id">
                <img
                    class="img-thumbnail"
                    v-if="dogImage.FileType == 'IMAGE'"
                    style="width: 35px; height: 35px; margin: 5px"
                    v-lazy="dogImage.MediaUrl || dogImage.MediaUrl"/>
                <p v-if="dogImage.FileType == 'VIDEO'" class="h3 mb-2">
                  <b-icon class=" " icon="play-btn-fill" aria-hidden="true" variant="dark" style="margin: 10px; width: 15px"/>
                </p>
              </span>
            </div>
          </b-link>
          <img v-if="!dog.ImageUrl" img-src="/api/v2/img/gap-no-image.jpg"/>
        </b-col>
        <b-col md="9" class="p-4">
          <b-card-title
          >{{ dog.Name }}
            <small
            >
              <b-badge
                  style=""
                  variant="success"
                  v-if="
                  dog.Availability.indexOf('available for adoption now!') > -1
                "
              >Available
              </b-badge
              >
              <b-badge
                  variant="warning"
                  v-if="dog.Availability.indexOf('home waiting') > -1"
              >
                <b-icon icon="house-door" aria-hidden="true"></b-icon>
                {{ dog.Availability }}
              </b-badge
              >
              <b-badge
                  variant="secondary"
                  v-if="dog.Availability.indexOf('soon.') > -1"
              >{{ dog.Availability }}
              </b-badge
              >
            </small
            >
          </b-card-title>
          <b-card-sub-title class="d-flex justify-content-between">
            <div>{{ dog.Age }} <span v-if="dog.Age>1">years old</span><span v-if="dog.Age===1">year old</span></div>
            <div>
              <b-img
                  v-b-tooltip.hover
                  title="Child Tolerant"
                  width="30"
                  v-if="dog.Classifications.IsChildFriendly"
                  src="/api/v2/img/IsChildFriendly.jpg"
                  alt=""
                  class="mr-2"
              />

              <b-img
                  v-b-tooltip.hover
                  title="Prefer Companion"
                  width="30"
                  v-if="dog.Classifications.IsDogFriendly"
                  src="/api/v2/img/IsDogFriendly.jpg"
                  alt=""
                  style="margin-right: 5px"
              />
              <b-img
                  v-b-tooltip.hover
                  title="Cat Frendly"
                  width="30"
                  v-if="dog.Classifications.IsCatFriendly"
                  src="/api/v2/img/IsCatFriendly.jpg"
                  alt=""
              />
              <b-img
                  v-b-tooltip.hover
                  title="Livestock Tolerant"
                  width="30"
                  v-if="dog.Classifications.IsLivestockFriendly"
                  src="/api/v2/img/IsLivestockFriendly.jpg"
                  alt=""
              />
              <b-img
                  v-b-tooltip.hover
                  title="Poultry Tolerant"
                  width="30"
                  v-if="dog.Classifications.IsPoultryFriendly"
                  src="/api/v2/img/IsPoultryFriendly.jpg"
                  alt=""
              />
              <b-img
                  v-b-tooltip.hover
                  title="Small Dog Friendly"
                  width="30"
                  v-if="dog.Classifications.IsSmallDogFriendly"
                  src="/api/v2/img/IsSmallDogFriendly.jpg"
                  alt=""
              />
              <b-img
                  v-b-tooltip.hover
                  title="Apartment Friendly"
                  width="30"
                  v-if="dog.Classifications.IsApartmentFriendly"
                  src="/api/v2/img/IsApartmentFriendly.jpg"
                  alt=""
              />
            </div>
          </b-card-sub-title>
          <b-card-text>
            <p>
              <strong>Racing Name:</strong>
              {{ dog.RacingName ? dog.RacingName : "Never Raced" }} <br/>
              <strong>Microchip No:</strong> {{ dog.Microchip ? dog.Microchip : "N/A" }}
            </p>
            <p></p>
          </b-card-text>

          <b-card-text>
            <span v-if="!read_more[dog.Name]">
              {{ dog.Description | truncate(250, "...") }}
            </span>
            <span v-if="read_more[dog.Name]"> {{ dog.Description }} </span>
            <b-link @click="showMore(dog.Name)" v-if="!read_more[dog.Name]">Show more
              <b-icon icon="chevron-expand" aria-hidden="true"></b-icon>
            </b-link>
            <b-link @click="showLess(dog.Name)" v-if="read_more[dog.Name]"
            >Show less
              <b-icon icon="chevron-contract" aria-hidden="true"></b-icon>
            </b-link>
          </b-card-text>

          <template #footer>
            {{ dog.Availability }}
          </template>
        </b-col>
      </b-row>
    </b-card>

    <b-modal id="DogModal" hide-footer size="xl">
      <template #modal-title>
        {{ selectedDog.Name }}  <b-badge variant="light" pill>{{ selectedDog.Age }} <span v-if="selectedDog.Age>1">years old</span><span v-if="selectedDog.Age===1">year old</span> </b-badge>
      </template>
      <b-carousel
          id="carousel-fade"
          ref="dog_slideshow"
          style="text-shadow: 0 0 2px #000"
          controls
          indicators
          background="#ddd"
          label-next='Next'
          :interval="0"
          img-width="1023"
          img-height="480"
          @sliding-start="onSlideStart"
      >
        <div v-for="dogImage in selectedDog.GapMediaLinks" :key="dogImage.id">
          <b-carousel-slide
              v-if="dogImage.FileType == 'IMAGE'"
              :img-src="dogImage.MediaUrl"
              :caption="dogImage.Caption"
          ></b-carousel-slide>
          <b-carousel-slide v-if="dogImage.FileType == 'VIDEO'" controls="false" :caption="dogImage.Caption">
            <template #img>
              <b-embed type="iframe" aspect="16by9"
                       :src="'https://www.youtube.com/embed/'+parseYoutubeURL(dogImage.MediaUrl)+'?controls=0'"
                       modestbranding></b-embed>
            </template>

          </b-carousel-slide>
        </div>
      </b-carousel>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      //Dev Server Config
      hostname: "http://gaptest.local",
      //Dev Server Config end
      myDogs: null,
      searchValue: "",
      never_raced: false,
      home_waiting: false,
      age_filter: 14,
      loading: true,
      selected: [],
      errors: [],
      classifications: [
        {text: "Child Tolerant", value: "IsChildFriendly"},
        {text: "Prefer Companion", value: "IsDogFriendly"},
        {text: "Cat Tolerant", value: "IsCatFriendly"},
        {text: "Poultry Tolerant", value: "IsPoultryFriendly"},
        {text: "Livestock Tolerant", value: "IsLivestockFriendly"},
        {text: "Small Dog Tolerant", value: "IsSmallDogFriendly"},
        {text: "Apartment Living", value: "IsApartmentFriendly"},
      ],
      classifications_selected: [],
      read_more: {},
      selectedDog: "",
    };
  },
  computed: {
    filteredDogs() {
      let tempDogs = this.myDogs;

      if (this.age_filter > 0 && tempDogs) {
        tempDogs = tempDogs.filter((item) => {
          return item.Age > 0 && item.Age <= this.age_filter ? item : ""; //re write this
        });
      }

      if (this.searchValue != "" && this.searchValue && tempDogs) {
        tempDogs = tempDogs.filter((item) => {
          return item.Name.toUpperCase().includes(
              this.searchValue.toUpperCase()
          );
        });
      }

      if (this.classifications_selected && tempDogs) {
        tempDogs = tempDogs.filter((item) =>
            this.classifications_selected.every(
                (selection) => item["Classifications"][selection] === true
            )
        );
      }

      if (this.never_raced && tempDogs) {
        tempDogs = tempDogs.filter((item) => {
          if (!item.RacingName) return item;
        });
      }

      if (this.home_waiting && tempDogs) {
        tempDogs = tempDogs.filter((item) => {
          if (!item.Availability.includes("home waiting")) return item;
        });
      }
      return tempDogs;
    },
  },
  methods: {
    sortedDogs() {
      let tempDogs = this.filteredDogs;

      function compare(a, b) {
        if (a.Age < b.Age) return -1;
        if (a.Age > b.Age) return 1;
        return 0;
      }

      this.myDogs = tempDogs;
      return tempDogs.sort(compare);
    },
    showMore(Name) {
      this.$set(this.read_more, Name, true);
    },
    showLess(Name) {
      this.$set(this.read_more, Name, false);
    },
    sendInfo(dog) {
      this.selectedDog = dog;
    },
    parseYoutubeURL(url) {
      var video_id = url.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      return video_id;
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
  created: async function () {
    this.loading = true;
    const response = await fetch("https://gap.grv.org.au/api/v2/apicall.php");
    //const response = await fetch(this.hostname+"/api/v2/apicall.php");
    //const response = await fetch("/api/v2/apicall.php"); //For Prod
    try {
      this.myDogs = await response.json();
      this.$emit("finishLoading");
      this.loading = false;
    } catch (error) {
      console.log("ERROR CODE:113 - FT JSON ERROR!");
    }
    this.loading = false;
    //For Debugging purposes
    // console.log(this.myDogs);
  },
};
</script>

<style scoped>
</style>