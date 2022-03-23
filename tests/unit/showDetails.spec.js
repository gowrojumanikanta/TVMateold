import { shallowMount ,createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import ShowDetails from '@/components/ShowDetails.vue'

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
import { BASE_URL, fetchShows ,showDetailsRes,fetchCastList,fetchSCrewList} from "../../src/utils.js"
jest.mock("axios");



     describe('ShowDetails.vue', () => {
        let wrapper
        beforeEach(()=>{
          wrapper = shallowMount(ShowDetails,{
            localVue,
            router
          })
        })

      it('should call getShowDetails api when page is loaded', () => {
        const getShowDetails = jest.fn()
        const getShowDetailsSpy = jest.spyOn(wrapper.vm, 'getShowDetails')
        wrapper.vm.getShowDetails()
        expect(getShowDetailsSpy).toHaveBeenCalled();
      });

      it('should call getCastInfo api when page is loaded', () => {
        const getCastInfo = jest.fn()
        const getCastInfoSpy = jest.spyOn(wrapper.vm, 'getCastInfo')
        wrapper.vm.getCastInfo()
        expect(getCastInfoSpy).toHaveBeenCalled();
      });

      it('should call getCreater api when page is loaded', () => {
        const getCreater = jest.fn()
        const getCreaterSpy = jest.spyOn(wrapper.vm, 'getCreater')
        wrapper.vm.getCreater()
        expect(getCreaterSpy).toHaveBeenCalled();
      });

     it('on onCast isCast flag set to true', () => {
        wrapper.vm.isCast = false;
        expect(wrapper.vm.isCast).toBe(false);
        wrapper.vm.onCast();
        expect(wrapper.vm.isCast).toBe(true);
     })

    it('on onDetails isCast flag set to false', () => {
        wrapper.vm.isCast = false;
        expect(wrapper.vm.isCast).toBe(false);
        wrapper.vm.onDetails();
        expect(wrapper.vm.isCast).toBe(false);
    })

    it('when shows details API call is successful',  async () => {
        wrapper.vm.getShowDetails()
        const showdet = [
            {
            "id": 1,
            "name": "Bitten"
            }
        ];
        axios.get.mockResolvedValueOnce(showdet);
        const result = await showDetailsRes();
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/show/1`);
        expect(result).toEqual(showdet);

    })
    it('when shows details API call is fail',  async () => {
        wrapper.vm.getShowDetails()
        const message = "Network Error";
        axios.get.mockRejectedValueOnce(new Error(message));

        const result = await showDetailsRes();

        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/show/1`);
        expect(result).toEqual([]);

    })

    it('when get cast  API call is successful',  async () => {
        wrapper.vm.getCastInfo()
        const cast = [
            {
            "id": 1,
            "name": "Bitten"
            }
        ];
        axios.get.mockResolvedValueOnce(cast);
        const result = await fetchCastList();
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows/1/cast`);
        expect(result).toEqual(cast);

    })
    it('when cast API call is fail',  async () => {
        wrapper.vm.getCastInfo()
        const message = "Network Error";
        axios.get.mockRejectedValueOnce(new Error(message));

        const result = await fetchCastList();

        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows/1/cast`);
        expect(result).toEqual([]);

    })

    it('when get crew  API call is successful',  async () => {
        wrapper.vm.getCreater()
        const cast = [
            {
            "id": 1,
            "name": "Bitten"
            }
        ];
        axios.get.mockResolvedValueOnce(cast);
        const result = await fetchSCrewList();
        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows/1/crew`);
        expect(result).toEqual(cast);

    })
    it('when crew API call is fail',  async () => {
        wrapper.vm.getCreater()
        const message = "Network Error";
        axios.get.mockRejectedValueOnce(new Error(message));

        const result = await fetchSCrewList();

        expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/shows/1/crew`);
        expect(result).toEqual([]);

    })

})
