import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';
import axiosInstance from '../../../src/services/Api';
import HomeView from '../../../src/views/Home.vue';
import store, { localVue } from './fakeStore';
import names from './names.json';

import * as AuditsService from '../../../src/services/AuditsService';

describe('Home view', () => {
  let wrapper;
  beforeAll(() => {
    const mock = new MockAdapter(axiosInstance);
    mock.onGet('/category-names').reply(200, names);
  });

  beforeEach(async () => {
    wrapper = mount(HomeView, { store, localVue });
    await nextTick();
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('Component should be loaded', async () => {
    expect(wrapper).toBeTruthy();
  });
  it('should display proper date range', () => {
    expect(wrapper.get('[data-test=dateRange').text()).toEqual('03/2022 - 08/2022');
  });
  it('The first row of the table should show the correct data', () => {
    const months = wrapper.findAll('thead > tr:nth-child(1) > td:not(:first-child)');
    expect(months.at(0).text()).toEqual('09/2021');
    expect(months.at(1).text()).toEqual('10/2021');
    expect(months.at(2).text()).toEqual('11/2021');
    expect(months.at(3).text()).toEqual('12/2021');
    expect(months.at(4).text()).toEqual('01/2022');
    expect(months.at(5).text()).toEqual('02/2022');
  });
  it('the second line should show the correct percentages', () => {
    const months = wrapper.findAll('thead > tr:nth-child(2) > td:not(:first-child)');
    const total = wrapper.get('.half-year-avarage').text();
    expect(total).toEqual('89.5%');
    expect(months.at(0).text()).toEqual('87.9%');
    expect(months.at(1).text()).toEqual('92.1%');
    expect(months.at(2).text()).toEqual('87.9%');
    expect(months.at(3).text()).toEqual('90.0%');
    expect(months.at(4).text()).toEqual('');
    expect(months.at(5).text()).toEqual('');
  });
  // prettier-ignore
  it('Category names should be correct', () => {

    const categories = wrapper.findAll('.category-name-and-perc');
    expect((categories).at(0).get('p').text()).toEqual('Před prodejnou, vstup do prodejny');
    expect((categories).at(1).get('p').text()).toEqual('V prodejně');
    expect((categories).at(2).get('p').text()).toEqual('Sklad, zázemí, kancelář');
    expect((categories).at(3).get('p').text()).toEqual('Layout, POS a MKT označení');
    expect((categories).at(4).get('p').text()).toEqual('Prezentace');
    expect((categories).at(5).get('p').text()).toEqual('Provoz');
    expect((categories).at(6).get('p').text()).toEqual('Stav zásob, "díry"');
    expect((categories).at(7).get('p').text()).toEqual('Doplněnost');
    expect((categories).at(8).get('p').text()).toEqual('Ceny, označení zboží');
    expect((categories).at(9).get('p').text()).toEqual('Expirace');
    expect((categories).at(10).get('p').text()).toEqual('Personál');
  });
  // prettier-ignore
  it('category percents should be correct', () => {
    const categories = wrapper.findAll('.category-name-and-perc');
    expect((categories).at(0).get('p:nth-child(2)').text()).toEqual('Ø 94.2 %');
    expect((categories).at(1).get('p:nth-child(2)').text()).toEqual('Ø 96.3 %');
    expect((categories).at(2).get('p:nth-child(2)').text()).toEqual('Ø 85.0 %');
    expect((categories).at(3).get('p:nth-child(2)').text()).toEqual('Ø 85.0 %');
    expect((categories).at(4).get('p:nth-child(2)').text()).toEqual('Ø 96.1 %');
    expect((categories).at(5).get('p:nth-child(2)').text()).toEqual('Ø 86.8 %');
    expect((categories).at(6).get('p:nth-child(2)').text()).toEqual('Ø 79.2 %');
    expect((categories).at(7).get('p:nth-child(2)').text()).toEqual('Ø 95.0 %');
    expect((categories).at(8).get('p:nth-child(2)').text()).toEqual('Ø 87.2 %');
    expect((categories).at(9).get('p:nth-child(2)').text()).toEqual('Ø 82.5 %');
    expect((categories).at(10).get('p:nth-child(2)').text()).toEqual('Ø 93.2 %');
  });
  // prettier-ignore
  it('Cat. 3. percent per month', async () => {
    const categories = wrapper.findAll('#cat3 > tr.category-heading > th:not(:first-child)');
    expect(categories.at(0).text()).toEqual('93.0%');
    expect(categories.at(1).text()).toEqual('90.0%');
    expect(categories.at(2).text()).toEqual('70.0%');
    expect(categories.at(3).text()).toEqual('87.0%');
    expect(categories.at(4).text()).toEqual('');
    expect(categories.at(5).text()).toEqual('');
  });
  // prettier-ignore
  it('Random results tests', () => {
    const accepted = 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z';
    const rejected = `M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5
    17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z`;

    expect(wrapper.get('#cat1 > tr:nth-child(2) > td:nth-child(2) > svg > path:nth-child(2)')
      .attributes('d')).toEqual(accepted);
    expect(wrapper.get('#cat1 > tr:nth-child(5) > td:nth-child(2) > svg > path:nth-child(2)')
      .attributes('d')).toEqual(rejected);
    expect(wrapper.get('#cat1 > tr:nth-child(5) > td:nth-child(2)')
      .attributes('comment')).toEqual('Skončil víkend: Kam se proboha poděla ta noc z pátka na neděli?!');
    expect(wrapper.get('#cat3 > tr:nth-child(8) > td:nth-child(4)')
      .attributes('rep')).toEqual('2');
  });
  it('whole html content of table wrapper', () => {
    expect(wrapper.get('.table-wrapper').html()).toEqual(fs.readFileSync('./tests/unit/HomeView/output.html', { encoding: 'utf-8' }));
  });
  it('when switching to the previous period, the date in dateSelector is correctly changed', async () => {
    const getAudit = jest.spyOn(AuditsService, 'getAudits');
    const prevBtn = wrapper.get('[data-test=get-prev]');

    prevBtn.trigger('click');
    await nextTick();

    expect(wrapper.get('[data-test=dateRange').text()).toEqual('09/2021 - 02/2022');
    expect(getAudit).toHaveBeenCalledTimes(1);
  });
});
