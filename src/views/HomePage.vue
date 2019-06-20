<template>
  <div class="container">
    <div class="content has-text-centered">
      <div class="columns">
        <div class="column is-one-third">
          <table v-if="educationsFetched" class="table" key="educations">
            <tbody>
              <tr
                v-for="(item, index) in educationsList"
                :key="index"
                :class="trClass(item.start_date)"
              >
                <td>
                  <router-link :to="'/education/' + item.id">{{
                    tinyDate(item.start_date)
                  }}</router-link>
                </td>
                <td>
                  <router-link :to="'/contact/' + item.contact_id">{{
                    item.contact_name
                  }}</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-one-third is-offset-one-third">
          <table v-if="practicesFetched" class="table" key="practices">
            <tbody>
              <tr
                v-for="(item, index) in practicesList"
                :key="index"
                :class="trClass(item.date_of_practice)"
              >
                <td>
                  <router-link :to="'/practice/' + item.id">{{
                    tinyDate(item.date_of_practice)
                  }}</router-link>
                </td>
                <td>
                  <router-link :to="'/practice/' + item.id">{{
                    item.kind_short_name
                  }}</router-link>
                </td>
                <td>
                  <router-link :to="'/company/' + item.company_id">{{
                    item.company_name
                  }}</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/auth";
import request from "@/request";

export default {
  name: "HomePage",
  data() {
    return {
      practicesFetched: false,
      educationsFetched: false,
      practicesList: [],
      educationsList: [],
      user: auth.user
    };
  },
  mounted() {
    this.fetchPractices();
    this.fetchEducations();
  },
  methods: {
    fetchPractices() {
      if (this.user.authenticated && !this.fetched) {
        request({
          url: "practices/near",
          method: "GET"
        }).then(r => {
          this.practicesList = r.data.practices;
          if (this.practicesList) {
            this.practicesList = this.practicesList.reverse();
          }
          this.practicesFetched = true;
        });
      }
    },
    fetchEducations() {
      if (this.user.authenticated && !this.fetched) {
        request({
          url: "educations/near",
          method: "GET"
        }).then(r => {
          this.educationsList = r.data.educations;
          if (this.educationsList) {
            this.educationsList = this.educationsList.reverse();
          }
          this.educationsFetched = true;
        });
      }
    },
    trClass(date) {
      const m = new Date();
      const d = new Date(date);
      if (d < m) {
        return "tr-is-success";
      }
      m.setMonth(m.getMonth() + 1);
      if (d < m) {
        return "tr-is-danger";
      }
      return "tr-is-warning";
    },
    tinyDate(date) {
      if (date.length === 10) {
        return `${date.substring(8, 10)}.${date.substring(
          5,
          7
        )}.${date.substring(2, 4)}`;
      }
      return date;
    }
  }
};
</script>

<style scoped>
.tr-is-success,
.tr-is-success:hover {
  /* background-color: rgba(35, 209, 96, 0.5); */
  border-bottom: 2px solid #23d160;
}

.tr-is-warning,
.tr-is-warning:hover {
  /* background-color: rgba(255, 221, 87, 0.5); */
  border-bottom: 2px solid #ffdd57;
}

.tr-is-danger,
.tr-is-danger:hover {
  /* background-color: rgba(255, 56, 96, 0.5); */
  border-bottom: 2px solid #fc0032;
}

.tr-is-success:hover {
  background-color: rgba(35, 209, 96, 0.7);
}

.tr-is-warning:hover {
  background-color: rgba(255, 221, 87, 0.7);
}

.tr-is-danger:hover {
  background-color: rgba(255, 56, 96, 0.7);
}

tr a {
  color: #363636;
}
</style>
