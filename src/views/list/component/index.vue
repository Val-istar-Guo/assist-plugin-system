<template lang="html">
  <div>
    <ul class="list">
      <li class="thing" v-for="thing in things" :key="thing.uuid">
        <div class="title">{{thing.title}}</div>
        <div class="description">{{thing.description}}</div>
        <span
          :class="['important', thing.important ? 'checked' : '']"
          type="checkbox"
          @click="modiftThings([{ uuid: thing.uuid, name: 'important', value: !thing.important }])"
        />
      </li>
    </ul>
    <creator class="creator"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import creator from './creator'


export default {
  initialData: async function ({ store, route }) {
  },
  components: {creator},
  data: function () {
    return {
      title: '',
    }
  },
  computed: mapGetters(['things']),
  methods: mapActions({
    modiftThings: 'system.modifyThings',
  }),
}
</script>

<style lang="postcss" scoped>
.list {
  margin: 0;
  padding: 0;
}
.thing {
  position: relative;
  list-style: none;
  border-bottom: 1px solid #eeeeee;
  padding: 16rem 30rem;
}

.title {
  font-size: 36rem;
  color: #333333;
}
.description {
  font-size: 20rem;
  color: #999999;
  padding-top: 4rem;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.important {
  position: absolute;
  top: 50%;
  right: 30rem;
  outline: none;
  border: none;
  border-radius: 50%;
  width: 30rem;
  height: 30rem;
  /* margin: 20rem; */
  transform: translateY(-50%);
  background: #f0f0f0;

  overflow:hidden;

  &.checked {
    background: #cf6270;
  }
}

.creator {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
