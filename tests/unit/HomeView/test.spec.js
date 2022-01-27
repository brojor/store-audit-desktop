import { mount } from '@vue/test-utils';
import HomeView from '../../../src/views/Home.vue';
import store, { localVue } from './fakeStore';

describe('Home view', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HomeView, { store, localVue });
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('Component should be loaded', async () => {
    expect(wrapper).toBeTruthy();
  });
  it('should load audit data from fake Vuex', () => {
    expect(wrapper.vm.audits).toHaveLength(6);
    expect(wrapper.vm.audits).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          auditor: expect.any(String),
          storeId: expect.any(String),
          date: expect.any(String),
          totalScore: expect.any(Object),
          categories: expect.any(Array),
        }),
      ]),
    );
  });
});
