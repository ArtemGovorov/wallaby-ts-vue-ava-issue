import test from 'ava';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '../src/components/HelloWorld.vue';

test('works', (t) => {
  const wrapper = shallowMount(HelloWorld, { propsData: { msg: 'world' } });
  t.is(wrapper.vm.$el.innerHTML, 'Hello world!');
});
