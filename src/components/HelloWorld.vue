<template>
<v-container>
  <v-autocomplete :items="dataSourceFrom.display" v-model="dataSourceFrom" @input="onSearch($event, 'from')"
        @select="selectPlace($event, 'from')">
  </v-autocomplete>
  <v-btn @click="onSearch('New York', 'from')"> Bonjour </v-btn>
</v-container>
</template>

<script>
  import store from '@/store';
  export default {
  name: 'HelloWorld',
  data() {
    return {
      dataSourceFrom: [],
      dataSourceTo: [],
      trip: "one",
      source: null,
      destination: null,
      outbound: null,
      inbound: null,
     };
  },
  methods: {
    onSearch(searchText, type) {
      console.log("fonction lancée");
      if (searchText.length > 2) {
        var source = [];
        console.log(type);
        store.dispatch("searchPlaces", searchText).then((data) => {
          console.log(data);
          // if (data.length) {
            source = data.map((item) => {
              return {
                city: item.presentation.title,
                airport: item.navigation.entityId,
                display: `${item.presentation.title} (${item.navigation.localizedName})`,
              };
            });
            console.log(source);
          // }
          if (type == "from") {
            this.dataSourceFrom = source;
          } else {
            this.dataSourceTo = source;
          }
        });
      }
    },
    selectPlace(value, type) {
      if (type == "from") {
        this.source = {
          id: value.value,
          name: value.city,
        };
      } else {
        this.destination = {
          id: value.value,
          name: value.city,
        };
      }
    },
    isValid() {
      if (this.trip == "one") {
        if (
          this.source &&
          this.destination &&
          this.outbound &&
          this.source.id !== this.destination.id
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.source &&
          this.destination &&
          this.outbound &&
          this.inbound &&
          this.source.id !== this.destination.id
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  }
  }
</script>
