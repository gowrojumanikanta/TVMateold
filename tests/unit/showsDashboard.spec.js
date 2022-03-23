
import { shallowMount ,createLocalVue, mount } from '@vue/test-utils'
import ShowsDashboard from '@/components/ShowsDashboard.vue'
import VueRouter from 'vue-router';
import ShowDetails from '@/components/ShowDetails.vue'
import Vue from 'vue'




const localVue = createLocalVue()
localVue.use(VueRouter)
const routes = []
const router = new VueRouter({ routes })

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: [
    ]}))
}))


import axios from "axios";

import { BASE_URL, fetchShows } from "../../src/utils.js"

jest.mock("axios");


     describe('ShowsDashboard.vue', () => {
      it('should call get list api  when page is loaded', () => {
        const getList = jest.fn()
        const wrapper = shallowMount(ShowsDashboard, {
            localVue,
            //methods: { getList }
          });
          const downloadSpy = jest.spyOn(wrapper.vm, 'getList')
          wrapper.vm.getList()

          expect(downloadSpy).toHaveBeenCalled();
        });
      });



      describe("ShowsDashboard.vue", () => {
        const wrapper = shallowMount(ShowsDashboard);
        describe("when shows get API call is successful", () => {
          wrapper.vm.getList();
          it("should return shows list", async () => {
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
            const result = await fetchShows();
            expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows`);
            expect(result).toEqual(shows);
          });
      });

      describe("when shows API call fails", () => {
          it("should return empty shows list", async () => {
            wrapper.vm.getList();
            const message = "Network Error";
            axios.get.mockRejectedValueOnce(new Error(message));

            const result = await fetchShows();

            expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows`);
            expect(result).toEqual([]);
          });
        });
      });

      describe('ShowsDashboard.vue', () => {
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
