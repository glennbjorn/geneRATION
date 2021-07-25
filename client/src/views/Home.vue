<template style="w3-mobile">
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>
  <div v-if="!isLoading">
    <div class="bar">
      <div class="w3-bar w3-black">
        <a
          @click="offFaq"
          href="#about-us"
          class="w3-center w3-bar-item w3-button w3-mobile"
          style="width: 33%"
          ><i class="fa fa-user"></i> About Us</a
        >

        <a
          @click="offFaq"
          href="#ongoing-campaigns"
          class="w3-center w3-bar-item w3-button w3-mobile"
          style="width: 34%"
          ><i class="fa fa-th"></i> Ongoing Campaigns</a
        >

        <a
          @click="onFaq"
          class="w3-center w3-bar-item w3-button w3-mobile"
          style="width: 33%"
          ><i class="fa fa-info-circle"></i> FAQ</a
        >
      </div>
    </div>

    <div v-if="!faq">
      <div class="hero-image">
        <div class="hero-text">
          <h1 style="font-size: 50px">do something that matters</h1>
          <p>
            <a
              href="#ongoing-campaigns"
              class="
              w3-button
              w3-white
              w3-padding-large
              w3-large
              w3-margin-top
              w3-opacity
              w3-hover-opacity-off
            "
              >donate today</a
            >
          </p>
        </div>
      </div>

      <div class="page">
        <div id="about-us">
          <img
            class="logo"
            src="@/assets/logo-new3.png"
            alt="Logo of geneRATION"
          />
          <span class="generation-intro">
            <h2>a one-stop food drive organiser<br /></h2>
          </span>

          <div class="aboutus-text">
            <p class="para-space">
              When it comes to food campaigns, there are often hiccups in the
              process of gathering public donations as well as picking,
              categorising, and dispersing food items.
            </p>

            <p class="para-space">
              Thus, as young individuals who recognise the significance of food
              charity drives and their impact on the less privileged in our
              society, we want to set up a website that will ease the process
              and produce positive outcomes for charitable organisations to
              acquire food donations.
            </p>

            <p>
              If you live within a 10 minute walk from the collection point, or
              are able to drop off the donations at the collection point, please
              consider donating to help those in need!
            </p>
          </div>
        </div>

        <div id="ongoing-campaigns" class="ongoing-campaigns">
          <div class="search" v-if="campaigns.length !== 0">
            <input
              type="text"
              v-model="search"
              size="35"
              placeholder="search by name, location or organisation"
            />
            <i @click="filter" class="fas fa-search fa-lg"></i>
          </div>

          <Campaigns :campaigns="filteredCampaigns" />

          <div class="home-no-campaign" v-if="campaigns.length == 0">
            <h2>There are no campaigns at the moment.</h2>
            <h3>Do visit another day!</h3>
          </div>
          <div
            class="home-no-campaign"
            v-if="campaigns.length !== 0 && filteredCampaigns.length == 0"
          >
            <h2>There are no campaigns that match your search result.</h2>
            <h3>Please try again!</h3>
          </div>
        </div>
      </div>
    </div>
    <div v-if="faq">
      <div class="page">
        <div>
          <h1><b>Frequently Asked Questions</b></h1>

          <div class="FAQ">
            <h2>How to Donate?</h2>
            <br />
            <p>
              1. Search &amp; select the campaign of your choice in the tab:
              <a
                @click="offFaq"
                href="#ongoing-campaigns"
                class="w3-center w3-bar-item w3-button w3-mobile"
                ><i class="fa fa-th"></i> Ongoing Campaigns</a
              ><br /><br />
              2. Read the details of the campaign &amp; click "Donate Today".<br /><br />
              3. Fill in your particulars &amp; decide between the self drop-off
              or door-to-door collection option. <br /><br />
              4. Enter the desired quantity to donate. <br /><br />
              5. Pledge your donation!
            </p>
            <br /><br />
            <h2>How to create a campaign on geneRATION?</h2>
            <br />
            <p>
              1. Register an account wih geneRATION.<br /><br />
              2. Under "Dashboad", select "Create New Campaign".<br /><br />
              3. Enter the campaign's name &amp; details.<br /><br />
              4. Add the type of items &amp; their respective target quantity.
              <br /><br />
              5. Tick the "Publish Campaign" checkbox followed by "Create
              Campaign"!
            </p>
            <br /><br />
            <h2>How to edit / delete / unpublish a campaign?</h2>
            <br />
            <p>
              1. Under "Dashboad", select "View My Campaigns".<br /><br />
              2. Select the campaign you wish to edit/delete &amp; click
              "Edit".<br /><br />
              3. Make the changes and/or uncheck the "Publish Campaign" checkbox
              to publish/unpublish a campaign from the home page.<br /><br />
              4. Select "Save Changes" or "Delete Campaign".
            </p>
            <br /><br />
            <h2>How to add collaborators?</h2>
            <br />
            <p>
              1. Under "Dashboad", select "View My Campaigns".<br /><br />
              2. Select the campaign you wish to add a collaborator &amp; click
              "Edit".<br /><br />
              3. Scroll to the bottom &amp; click on "Manage Administrators".<br /><br />
              4. Enter the collaborator(s)' email &amp; "Give Permission".
            </p>
            <br /><br />
            <h2>How to view / export existing donations?</h2>
            <br />
            <p>
              1. Under "Dashboad", select "View My Campaigns".<br /><br />
              2. Select the campaign you wish to view/export &amp; click "Donors
              Information".<br /><br />
              3. Select "Export as Excel" to export as an Excel.xlsx .
              <br /><br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import Campaigns from "@/components/Campaigns";
import axios from "axios";
import moment from "moment";
import Loading from "@/components/Loading"

export default {
  name: "Home",

  components: {
    Nav,
    Campaigns,
    Loading
  },

  data() {
    return {
      campaigns: [],
      isLoading: true,
      search: "",
      filteredCampaigns: [],
      currentDate: "",
      faq: false,
    };
  },

  methods: {
    async getCampaigns() {
      const res = await axios.post("/api/campaign/getAllCampaigns");

      const data = await res.data;

      const list = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].publish) {
          if (data[i].collectionDate >= this.currentDate) {
            list.push(data[i]);
          } else {
            this.unpublish(data[i]);
          }
        }
      }

      return list;
    },

    filter() {
      let array = [];

      const search = this.search.toLowerCase();
      console.log(this.campaigns[0].name.toLowerCase());

      for (let i = 0; i < this.campaigns.length; i++) {
        if (
          this.campaigns[i].name.toLowerCase().match(search) ||
          this.campaigns[i].collectionAddress.toLowerCase().match(search) ||
          this.campaigns[i].org.toLowerCase().match(search)
        ) {
          array.push(this.campaigns[i]);
        }
      }

      this.filteredCampaigns = array;
    },

    async unpublish(campaign) {
      await axios.post("/api/campaign/editCampaign", {
        _id: campaign._id,
        name: campaign.name,
        camDesc: campaign.camDesc,
        orgDesc: campaign.orgDesc,
        collectionAddress: campaign.collectionAddress,
        collectionContact: campaign.collectionContact,
        collectionDate: campaign.collectionDate,
        items: campaign.items,
        publish: false,
      });
    },

    onFaq() {
      this.faq = true;
    },

    offFaq() {
      this.faq = false;
    },
  },

  async created() {
    this.currentDate = moment(moment().toDate()).format("YYYY-MM-DD");
    this.campaigns = await this.getCampaigns();
    this.filteredCampaigns = this.campaigns;
    this.isLoading = false;
  },
};
</script>

<style>
.header {
  text-align: center;
  margin-top: -20px;
  font-size: 100px;
  margin-bottom: 30px;
}

.page {
  width: 100%;
  padding: 15px;
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.page .home-no-campaign h2 {
  text-align: center;
  margin-top: 70px;
}

.page .home-no-campaign h3 {
  text-align: center;
  margin-top: 50px;
}

.page h1 {
  margin-top: 20px;
  text-align: center;
}

.logo {
  max-width: 300px;
  margin-right: auto;
  margin: 0 auto;
  display: block;
  margin-top: 120px;
}

.generation-intro h2 {
  font-weight: bolder;
  color: #cd2520;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
}

.aboutus-text {
  max-width: 1000px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  /* font-weight: bold; */
  margin-bottom: 100px;
}

.para-space {
  margin-bottom: 50px;
}

@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://fonts.googleapis.com/css?family=Raleway");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

body,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Raleway", sans-serif;
}

body,
html {
  height: 100%;
  line-height: 1.8;
}

.hero-image {
  background-image: url("../assets/fooddistribution2.jpg");
  background-color: #cccccc;
  height: 810px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.bar {
  margin-top: -25px;
}

.page .ongoing-campaigns {
  margin-bottom: 100px;
}

.search {
  text-align: center;
  margin-bottom: 20px;
}

.search input {
  margin-right: 1%;
}

.fas {
  cursor: pointer;
}

.FAQ {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
  /* font-weight: bold; */
  margin-bottom: 100px;
}
</style>
