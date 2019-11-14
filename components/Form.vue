<template>
  <b-container class="pt-5">
    <b-row>
      <b-col>
        <button class="mb-2 btn btn-success" @click="reset">Reset</button>
        <nested-draggable
          v-model="theItems"
          @toTop="toTop"
          @underTopSibling="underTopSibling"
          @outFromParent="outFromParent"
        ></nested-draggable>
      </b-col>
      <b-col>
        <pre>{{JSON.stringify(theItems, null, 2)}}</pre>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NestedDraggable from "./NestedDraggable";

export default {
  data() {
    return { items: this.getData() };
  },
  created() {},
  computed: {
    theItems: {
      get() {
        return this.items;
      },
      set(v) {
        this.items = v;
      }
    }
  },

  methods: {
    toTop(who) {
      // Expected to be a root item.
      const index = this.items.findIndex(item => who.id === item.id);

      if (index > -1) {
        this.items = this.items.splice(index, 1).concat(this.items);
      }
    },
    underTopSibling(who) {
      console.log("underTopSibling", { who });
    },
    outFromParent(who) {
      console.log("outFromParent", { who });
    },
    reset() {
      this.items = this.getData();
    },
    getData() {
      return [
        {
          id: 1,
          title: "Bags",
          children: [
            {
              id: 2,
              title: "Inner bag",
              children: []
            },
            {
              id: 3,
              title: "Baginer",
              children: []
            }
          ]
        },
        {
          id: 4,
          title: "T-Shirts",
          children: []
        },

        {
          id: 5,
          title: "Toys",
          children: []
        }
      ];
    }
  },
  components: {
    NestedDraggable
  }
};
</script>
