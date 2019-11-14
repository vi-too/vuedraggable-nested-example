<template>
  <draggable
    v-bind="dragOptions"
    :value="value"
    @change="log"
    :list="list"
    :move="checkMove"
    @input="emitted"
  >
    <div v-for="(el, index) in realValue" :key="'card-' + el.id">
      <b-card class="mb-2" :no-body="true">
        <template v-slot:header>
          <h3 class="h5 m-0 d-flex justify-content-between">
            <span>{{el.title}}</span>
            <b-button size="sm" v-b-toggle="'collapse-' + el.id">T</b-button>
          </h3>
        </template>
        <b-collapse :id="'collapse-' + el.id">
          <b-card-body>
            <b-card-text>
              <em>Move:</em>
              <a
                href="#"
                @click.prevent="toTop(el)"
                v-if="index !== 0 && !hasParent"
                title="Transfer item from the top most area."
              >To Top</a>
              <a
                href="#"
                @click.prevent="underTopSibling(el)"
                v-if="index > 0"
                title="Transfer item under its top sibling."
              >
                Under
                <strong>{{realValue[index - 1].title}}</strong>
              </a>
              <a
                href="#"
                @click.prevent="outFromParent(el)"
                v-if="hasParent"
                title="Transfer item out from its parent"
              >
                Out from under
                <strong>{{parent.title}}</strong>
              </a>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <nested-draggable
        class="pl-4"
        :top-sibling="index === 0 ? undefined : realValue[index - 1]"
        :parent="el"
        :list="el.children"
        @toTop="toTop"
        @underTopSibling="underTopSibling"
        @outFromParent="outFromParent"
      ></nested-draggable>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "nested-draggable",
  components: {
    draggable
  },
  methods: {
    emitted(val) {
      this.$emit("input", val);
    },
    log(e) {
      console.log(e);
    },
    checkMove(e) {
      console.log({ move: e });

      return true;
    },
    toTop(who) {
      console.log({ who });
      this.$emit("toTop", who);
    },
    underTopSibling(who) {
      this.$emit("underTopSibling", who);
    },
    outFromParent(who) {
      this.$emit("outFromParent", who);
    }
  },
  computed: {
    realValue() {
      return this.value ? this.value : this.list;
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        ghostClass: "ghost",
        chosenClass: "chosen"
      };
    },
    hasParent() {
      return !!this.parent;
    }
  },
  props: {
    value: {
      type: Array,
      required: false
    },
    list: {
      type: Array,
      required: false
    },
    parent: {
      type: Object,
      required: false
    },
    topSibling: {
      type: Object,
      required: false
    },
    bottomSibling: {
      type: Object,
      required: false
    }
  }
};
</script>

<style scoped>
.chosen {
  cursor: grabbing;
}
.list-group-item {
  cursor: grab;
}
</style>
