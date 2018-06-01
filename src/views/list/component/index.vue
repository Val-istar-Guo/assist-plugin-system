<template lang="html">
  <div class="container">
    <ul class="list">
      <li class="thing" v-for="thing in things" :key="thing.uuid">
        <div class="title">{{thing.title}}</div>
        <div class="description">{{thing.description}}</div>
        <span
          :class="['important', thing.important ? 'checked' : '']"
          type="checkbox"
          @click="modiftThings([{ uuid: thing.uuid, name: 'important', value: !thing.important }])"
        ><span class="icon" /></span>
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
.container {
  box-sizing: border-box;
  padding-bottom: 120px;
  height: 100%;
}

.list {
  margin: 0;
  padding: 0;
  height: 100%;

  overflow: auto;
}
.thing {
  position: relative;
  list-style: none;
  border-bottom: 1px solid #eeeeee;
  padding: 16px 30px;
}

.title {
  font-size: 32px;
  line-height: 45px;
  color: #333333;
}
.description {
  font-size: 24px;
  line-height: 33px;
  color: #999999;
  padding-top: 4px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.important {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 30px;
  overflow:hidden;


  & .icon {
    display: block;
    width: 30px;
    height: 30px;
    background: #f0f0f0;
    outline: none;
    border: none;
    border-radius: 50%;
  }

  &.checked .icon {
    background: #cf6270;
  }

}

.creator {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
