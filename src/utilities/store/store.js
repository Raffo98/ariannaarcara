import { defineStore } from "pinia";

export const useStateStore = defineStore("state", {
  state: () => {
    return { activeSectionId: "", scrollState: 0, pageSection: "home", min: 0, max: 0, partialMin: 0, partialMax: 0, isFilterOpen: false };
  },
  actions: {
    changeSectionId(id) { /*Change header section ID */
      this.activeSectionId = id;
    },
    updateScroll(scrollIncrement) {
      this.scrollState = scrollIncrement;
    },
    updatePage(id) {
      this.pageSection = id;
    },
    updateMinMax(min, max) {
      this.min = min;
      this.max = max;
    },
    updatePartialMinMax(partialMin, partialMax) {
      this.partialMin = partialMin;
      this.partialMax = partialMax;
    },

    updateFilterState(isFilterOpen) {
      this.isFilterOpen = !isFilterOpen;
    }
  }
});
