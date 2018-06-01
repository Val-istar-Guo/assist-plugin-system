<template lang="html">
  <div :class="['container', active ? 'active' : '']">
    <p class="placeholder" @click="activatePanel">点击添加事务</p>

    <div class="panel">
      <close-button @click="disabledPanel" class="close" />
      <div v-for="field in fields">
        <assist-input
          class="input"
          :type="field.type"
          :label="field.label"
          @change="edit({ title: $event })"
          :value="values[field.name]"
        />
      </div>
      <assist-button @click="createThing">创建</assist-button>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  initialData: async function ({ store, route }) {
  },
  data: function () {
    return {
      active: false,
      fields: [],
      values: {},
    }
  },
  computed: {
    ...mapGetters(['things', 'thingTypes']),
  },
  methods: {
    ...mapActions({
      appendThing: 'system.appendThing',
    }),
    buildFields(type) {
      const { thingTypes } = this
      const thingType = thingTypes.find(t => t.type === type)
      const fields = thingType.fields
        .filter(field => field.required)

      const values = fields
        .reduce((o, field) => {
          o[field.name]  = field.defaulted
          return o;
        }, {});

      values.type = type
      this.fields = fields
      this.values = values
    },
    activatePanel() {
      const { thingTypes } = this
      this.active = true
      this.buildFields(thingTypes[0].type)
    },
    disabledPanel() {
      this.active = false
    },
    edit(props) {
      if ('type' in props) this.buildFields(props.type)

      this.values = {
        ...this.values,
        ...props,
      }
    },
    createThing() {
      this.appendThing(this.values)
      this.disabledPanel()
    },
  }
}
</script>

<style lang="postcss" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  padding: 0 30px;
  border-top: 1px solid #e5e5e5;
  background: #fff;

  transition: height .2s ease-out;
  &.active {
    height: 100%;
  }
}

.placeholder {
  margin: 0;
  color: #e5e5e5;
  font-size: 36px;
  line-height: 120px;
  height: 120px;
  font-weight: lighter;
  letter-spacing: 2px;

  opacity: 1;
  transition: opacity .1s linear, height .1s linear;

  @nest .active & {
    opacity: 0;
    height: 0;
  }
}

.panel {
  opacity: 0;
  text-align: center;
  transition: opacity .2s linear, height .1s linear;
  padding: 140px 0 0 0;

  & .close {
    position: absolute;
    top: 60px;
    right: 60px;
  }

  & .input {
    margin: 20px 0;
  }

  @nest .active & {
    opacity: 1;
  }
}
</style>
