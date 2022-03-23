import { shallowMount ,createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import ShowDetails from '@/components/ShowDetails.vue'
import ShowsDashboard from '@/components/ShowsDashboard.vue'
import App from '@/App.vue'

import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(VueRouter)
const routes = []
const router = new VueRouter({ routes })

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: [
    ]}))
}))

import axios from "axios";

import { BASE_URL, fetchShows,fetchShowList } from "../../src/utils.js"

jest.mock("axios");


describe('App.vue', () => {
  let wrapper
  beforeEach(()=>{
    wrapper = shallowMount(App,{
      localVue,
      router
    })
  })

  it('when search api is successful on search button',  async () => {
    const savebutton = wrapper.find('#searchBtn')
    const spy = jest.spyOn(wrapper.vm, 'OnmovieScrh')
    savebutton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(spy).toHaveBeenCalled()
      //wrapper.vm.OnmovieScrh();
      const shows = [
          {
          "id": 1,
          "name": "Bitten"
          },
          {
          "id": 2,
          "name": "Person of Interest",
          }
      ];
      axios.get.mockResolvedValueOnce(shows);
      const result = await fetchShowList();
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows?q=arrow`);
      expect(result).toEqual(shows);

  })

  it('when search api is fail on search button',  async () => {
      const savebutton = wrapper.find('#searchBtn')
      const spy = jest.spyOn(wrapper.vm, 'OnmovieScrh')
      savebutton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(spy).toHaveBeenCalled()
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      const result = await fetchShowList();

      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows?q=arrow`);
      expect(result).toEqual([]);

  })

  describe('App.vue', () => {
    describe("when click on back ", () => {
      let wrapper
       beforeEach(()=>{
        const goHome = jest.fn()
         wrapper = shallowMount(App,{
          localVue,
          router,
          methods: { goHome }
        })
      })
      it('Sholud show to dashboard', () => {
           wrapper.vm.isSearch = false;
           wrapper.vm.searchText = "";

          wrapper.vm.goHome()
          expect(wrapper.vm.isSearch).toBe(false)
          })
        })
  })


  describe('App.vue', () => {
    describe("when click on any show from the dash board", () => {
      let wrapper
       beforeEach(()=>{
        const onShowClick = jest.fn()
         wrapper = shallowMount(ShowDetails,{
          localVue,
          router,
          methods: { onShowClick }
        })
      })
      it('Sholud navigate to the details page on any show selection', () => {
          wrapper.vm.onShowClick(1)
          expect(wrapper.findComponent(ShowDetails).exists()).toBe(true)
          })
        })
  })

})
