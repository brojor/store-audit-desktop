import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../../src/services/Api';

import 'jest-canvas-mock';

import Chart from '../../src/views/Chart.vue';
import myStore from '../../src/store';
import response from './storesFilterResponse.json';
import deficiens from './deficiens.json';

describe('Chart.vue', () => {
  const mock = new MockAdapter(axiosInstance);
  mock.onGet('/chart/store-filter-options').reply(200, response);
  mock
    .onGet(
      '/chart/aggregated/all?after=2021-03-01T00%3A00%3A00.000Z&before=2021-08-28T23%3A59%3A59.999Z&detailLevel=categories&sortBy=id',
    )
    .reply(200, deficiens);
  mock
    .onGet(
      '/chart/aggregated/all?after=2021-09-01T00%3A00%3A00.000Z&before=2022-02-28T23%3A59%3A59.999Z&detailLevel=categories&sortBy=id',
    )
    .reply(200, []);
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Chart, { store: myStore });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('Component is loaded', async () => {
    await nextTick();
    expect(wrapper).toBeTruthy();
  });

  it('The first option is loaded in the selector', async () => {
    await nextTick();
    const select = wrapper.find('#selector');
    expect(select.element.value).toBe(response[0].id);
  });
  it('Select component has right number of options', async () => {
    await nextTick();
    const options = wrapper.findAll('option');
    expect(options.length).toBe(response.length);
  });
  it('Date of semester is correct', async () => {
    await nextTick();
    expect(wrapper.find('.date-range-wrapper').text()).toBe('09/2021 - 02/2022');
  });
  it('Date of semester changes properly', async () => {
    await nextTick();
    wrapper.get('[data-test=get-prev]').trigger('click');
    await nextTick();
    expect(wrapper.find('.date-range-wrapper').text()).toBe('03/2021 - 08/2021');
  });
});
