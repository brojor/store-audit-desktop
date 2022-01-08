import { mount } from '@vue/test-utils';
import Chart from '../../src/views/Chart.vue';

import myStore from '../../src/store';

describe('Chart.vue', () => {
  it('Component is loaded', () => {
    const wrapper = mount(Chart, { store: myStore });
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });
  it('Nějaký popisek', () => {
    const wrapper = mount(Chart, { store: myStore });
    console.log(wrapper.html());
  });

  // it('load component', () => {
  //   const wrapper = mount(Chart, {
  //     mocks: {
  //       $store: {
  //         state: {
  //           loading: false,
  //         },
  //       },
  //     },
  //   });
  //   console.log(wrapper.html());
  //   // expect(wrapper.exists()).toBe(true);
  // });
});
