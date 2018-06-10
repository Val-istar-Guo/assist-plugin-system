<template lang="html">
  <div class="container">
    <ul class="list">
      <li class="thing" v-for="thing in things" :key="thing.uuid">
        <div class="title">{{thing.title}}</div>
        <div class="note">{{thing.note}}</div>
        <span
          :class="['important', thing.important ? 'checked' : '']"
          type="checkbox"
          @click="modiftThings([{ id: thing.id, important: !thing.important }])"
        ><span class="icon" /></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  initialData: async function ({ store, route }) {
  },
  data: function () {
    return {
      title: '',
    }
  },
  computed: mapGetters(['things']),
  methods: mapActions({
    modiftThings: 'system.data.things.modify',
  }),
}
</script>

<style lang="postcss" scoped>
.container {
  box-sizing: border-box;
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
.note {
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
  -webkit-tap-highlight-color: transparent;

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
