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
          ><b-icon
            icon="sort-down-alt"
            @click="sortedDogs"
            aria-hidden="true"
          ></b-icon>
          Sort by Age</b-button
        >

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
        <strong>Clasifications</strong>
        <b-form-group>
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
        <b-form-input
          v-model="searchValue"
          placeholder="Search by name"
        ></b-form-input>
        <br />
        <b-form-checkbox v-model="never_raced" key="Never Raced"
          >Never Raced</b-form-checkbox
        >
        <b-form-checkbox v-model="home_waiting" key="Never Raced">
          Exclude 'home waiting' dogs</b-form-checkbox
        >
      </div>
    </div>
    <b-badge variant="light">{{ filteredDogs.length }}</b-badge>
    <span v-if="filteredDogs.length > 1 || filteredDogs.length == 0"
      >dogs
    </span>
    <span v-if="filteredDogs.length == 1">pooch </span>matching your selection
    <hr />

    <!-- <b-card-group columns> -->
    <b-card
      no-body
      v-for="dog in filteredDogs"
      :key="dog.id"
      :img-alt="dog.Name"
      tag="article"
      class="overflow-hidden mb-3"
      footer-tag="footer"
    >
      <b-row no-gutters>
        <b-col md="3">
          <b-link
          class="mx-auto"
            v-if="dog.GapMediaLinks.length >0"
            variant="success"
            v-b-modal="'myModal'"
            user="'item'"
            @click="sendInfo(dog)"
            ><b-icon icon="box-arrow-up-right" aria-hidden="true"></b-icon>
            </b-link>
          <img
            v-lazy="dog.ImageUrl || dog.ImageUrl"
            style="height: 100%"
            @click="openGallery()"
          />
          <img v-if="!dog.ImageUrl" img-src="/api/v2/img/gap-no-image.jpg" />
          <LightBox
            ref="lightbox"
            :media="media"
            :showLightBox="showLightbox"
          />
          <!-- <b-card-img :src="dog.ImageUrl" alt="Image" class="rounded-0" fluid></b-card-img> -->
          <!-- <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            :interval="10"
            img-width="1023"
            img-height="480"
          >
            <b-carousel-slide
              v-if="dog.ImageUrl == ''"
              img-src="/api/v2/img/gap-no-image.jpg"
            ></b-carousel-slide>
            <b-carousel-slide :img-src="dog.ImageUrl"></b-carousel-slide>
            <b-carousel-slide :img-src="dog.ImageUrl"></b-carousel-slide>
          </b-carousel> -->
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
          <b-card-title
            >{{ dog.Name }}
            <small
              ><b-badge
                style=""
                variant="success"
                v-if="
                  dog.Availability.indexOf('available for adoption now!') > -1
                "
                >Available</b-badge
              >
              <b-badge
                variant="warning"
                v-if="dog.Availability.indexOf('home waiting') > -1"
                ><b-icon icon="house-door" aria-hidden="true"></b-icon> {{ dog.Availability }}</b-badge
              >
              <b-badge
                variant="secondary"
                v-if="dog.Availability.indexOf('soon.') > -1"
                >{{ dog.Availability }}</b-badge
              ></small
            >
          </b-card-title>
          <b-card-sub-title class="d-flex justify-content-between">
            <div>{{ dog.Age }} year(s) old</div>
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
              Racing Name:
              {{ dog.RacingName ? dog.RacingName : "Never Raced" }} <br />
              Microchip No: {{ dog.Microchip ? dog.Microchip : "N/A" }}
            </p>
            <p></p>
            <!-- {{dog.Description}} -->
            <!-- {{ dog.Description | truncate(1500, "...") }} -->
            <!-- <span>View more</span> -->
          </b-card-text>

          <b-card-text>
            <span v-if="!read_more[dog.Name]">
              {{ dog.Description | truncate(150, "...") }}
            </span>
            <span v-if="read_more[dog.Name]"> {{ dog.Description }} </span>
            <b-link @click="showMore(dog.Name)" v-if="!read_more[dog.Name]"
              ><b-icon icon="chevron-expand" aria-hidden="true"></b-icon></b-link
            >
            <b-link @click="showLess(dog.Name)" v-if="read_more[dog.Name]"
              ><b-icon icon="chevron-contract" aria-hidden="true"></b-icon></b-link
            >
            <!-- <truncate action-class="customClass" clamp="Show more" :length="90" less="Show Less" type="text" :text="dog.Description"></truncate> -->
          </b-card-text>

          <template #footer>
            {{ dog.Availability }}
          </template>
        </b-col>
      </b-row>
    </b-card>

    <b-modal id="myModal" hide-footer size="xl">
      <!-- Hello {{ selectedDog.GapMediaLinks }} {{ selectedDog.Availability }} ! -->
      <template #modal-title>
        {{ selectedDog.Name }} - {{ selectedDog.Age }} Year(s) Old 
      </template>
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        controls
        indicators
        label-next = 'Next'
        :interval="0"
        img-width="1023"
        img-height="480"
      >
        <div v-for="dogImage in selectedDog.GapMediaLinks" :key="dogImage.id">
          <b-carousel-slide
            v-if="dogImage.FileType == 'IMAGE'"
            
            :img-src="imageLink"
            :caption="dogImage.Caption"
          ></b-carousel-slide>
          <!-- <b-carousel-slide v-if="dogImage.FileType == 'VIDEO'"
          :text-html="embedCode"
          >
            <b-embed
              type="iframe"
              aspect="16by9"
              :src="embedurl"
              allowfullscreen
            ></b-embed>
          </b-carousel-slide> -->
          <b-carousel-slide v-if="dogImage.FileType == 'VIDEO'" controls="false">
            <template #img>
              <b-embed type="iframe" aspect="16by9" :src="embedurl" modestbranding></b-embed>
            </template>
          </b-carousel-slide>
        </div>
      </b-carousel>
    </b-modal>
    <!-- </b-card-group> -->
  </div>
</template>

<script>
// import axios from 'axios';
import LightBox from "vue-image-lightbox";
require("vue-image-lightbox/dist/vue-image-lightbox.min.css");

export default {
  name: "home",
  components: {
    LightBox,
  },

  data() {
    return {
      hostname: "http://gaptest.local",
      myDogs: null,
      searchValue: "",
      never_raced: false,
      home_waiting: false,
      age_filter: 14,
      loading: true,
      selected: [], // Must be an array reference!
      errors: [],
      age_options: [
        { text: "0-1 yr olds", value: "1" },
        { text: "1-2 yr olds", value: "2" },
        { text: "2-3 yr olds", value: "3" },
        { text: "3-4 yr olds", value: "4" },
      ],
      clasifications: [
        { text: "Child Tolerant", value: "IsChildFriendly" },
        { text: "Prefer Companion", value: "IsDogFriendly" },
        { text: "Cat Tolerant", value: "IsCatFriendly" },
        { text: "Poultry Tolerant", value: "IsPoultryFriendly" },
        { text: "Livestock Tolerant", value: "IsLivestockFriendly" },
        { text: "Samll Dog Tolerant", value: "IsSmallDogFriendly" },
        { text: "Apartment Living", value: "IsApartmentFriendly" },
      ],
      clasifications_selected: [],
      read_more: {},
      media: [
        {
          thumb:
            "http://fasttrack.blob.core.windows.net/fasttrackpublic/GAPDogs/5875.jpg",
          src: "http://fasttrack.blob.core.windows.net/fasttrackpublic/GAPDogs/5875.jpg",
        },
      ],
      showLightbox: false,
      selectedDog: "",
      embedurl: "https://www.youtube.com/embed/zpOULjyy-n8?controls=0",
      embedCode:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/O41t33XZS6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      imageLink:'https://gap.grv.org.au/wp-content/uploads/2021/12/Lucas-Scott-with-Stuart-the-greyhound_.jpg'  
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

      if (this.clasifications_selected && tempDogs) {
        tempDogs = tempDogs.filter((item) =>
          this.clasifications_selected.every(
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
      // this.myDogs = tempDogs
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
    openGallery() {
      this.$refs.lightbox.showImage();
      // this.showLightbox = true;
    },
    sendInfo(dog) {
      this.selectedDog = dog;
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

    console.log(this.myDogs);
  },
};
</script>

<style scoped>
</style>