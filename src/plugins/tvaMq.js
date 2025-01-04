import { computed, onBeforeMount, ref } from "vue";

const install = function (options) {
  const device = ref("");
  const breakpoints = ref({
    mobile: 720,
    tablet: 1000,
    desktop: 1280,
    large: Infinity,
  });

  const $tvaMq = computed(() => device.value);

  onBeforeMount(() => {
    if (options) breakpoints.value = options;

    device.value = checkDevice();

    window.addEventListener("resize", () => {
      device.value = checkDevice();
    });
  });

  function checkDevice() {
    return window.innerWidth <= breakpoints.value.mobile
      ? "mobile"
      : window.innerWidth <= breakpoints.value.tablet
      ? "tablet"
      : window.innerWidth <= breakpoints.value.desktop
      ? "desktop"
      : "large";
  }

  return { $tvaMq };
};

export default install;
