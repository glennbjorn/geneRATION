<template>
  <Nav />
  <div v-if="isLoading">
    <Loading />
  </div>

  <div v-if="!isLoading">
    <div class="page" v-if="!auth">
      <h1>You are not authorised to view this page</h1>
    </div>
    <div class="page" v-if="auth">
      <div class="owner">
        <h3>OWNER: {{ owner }}</h3>
      </div>
      <AddAdmin @add-admin="addAdmin" />
      <Admins @delete-admin="deleteAdmin" :admins="admins" />
      <div class="admins" v-if="admins.length === 0">
        <p>No collaborators at the moment</p>
      </div>
      <button
        class="back"
        @click="$router.push(`/mycampaigns/${campaignid}/edit`)"
      >
        Back to Editing Campaign
      </button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";
import axios from "axios";
import Admins from "@/components/Admins";
import AddAdmin from "@/components/AddAdmin";
import Loading from "@/components/Loading";

export default {
  name: "ManageAdmins",

  data() {
    return {
      user: {},
      auth: false,
      campaignid: "",
      campaign: [],
      admins: [],
      owner: "",
      isLoading: true,
    };
  },

  components: {
    Nav,
    Admins,
    AddAdmin,
    Loading,
  },

  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
      }
    },

    checkAuth() {
      let admins = this.campaign.admin;
      for (var i = 0; i < admins.length; i++) {
        if (admins[i].email === this.user.email) {
          this.auth = true;
        }
      }
    },

    getCampaignId() {
      this.campaignid = this.$route.path.slice(13, -7);
    },

    async getCampaign() {
      const res = await axios.post("/api/campaign/getCampaignById", {
        _id: this.campaignid,
      });

      const data = await res.data[0];

      return data;
    },

    getAdmins() {
      this.admins = this.campaign.admin.slice(1);
    },

    getOwner() {
      this.owner = this.campaign.admin[0].email;
    },

    async addAdmin(admin) {
      const res = await axios.post("/api/findUser", {
        email: String(admin.email).toLowerCase(),
      });
      if (res.status === 202) {
        this.$swal("Email is not an existing user. Please try again!");
        return;
      }
      var arr = this.admins;
      if (this.owner === admin.email) {
        this.$swal("Owner is already a collaborator!");
        return;
      }
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].email === admin.email) {
          this.$swal("Email already added!");
          return;
        }
      }
      this.admins = [...this.admins, admin];
      let admins = [{ email: this.owner }, ...this.admins];
      await axios.post("/api/campaign/updateAdmins", {
        _id: this.campaignid,
        admin: admins,
      });
    },

    async deleteAdmin(admin) {
      if (confirm("Are you sure you want to delete this administrator?")) {
        var arr = this.admins;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].email === admin) {
            arr.splice(i, 1);
          }
        }
        this.admins = arr;
        let admins = [{ email: this.owner }, ...this.admins];
        await axios.post("/api/campaign/updateAdmins", {
          _id: this.campaignid,
          admin: admins,
        });
      }
    },
  },

  async created() {
    this.getUserDetails();
    this.getCampaignId();
    this.campaign = await this.getCampaign();
    this.checkAuth();
    this.getAdmins();
    this.getOwner();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.owner {
  margin-top: 30px;
}

.owner h3 {
  text-align: center;
}

.back {
  background: white;
  border-inline: 3px;
  border-color: black;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  margin-top: 40px;
  margin-bottom: 100px;
}

.admins {
  text-align: center;
  margin-bottom: 40px;
}
</style>
