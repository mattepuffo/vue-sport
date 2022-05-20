<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ title }}</h5>

        <Chart type="line" :data="basicData" :options="basicOptions"/>

      </div>
    </div>
  </div>
</template>

<script>
import PesiService from "@/service/PesiService";

export default {
  data() {
    return {
      title: "Pesi",
      pesiService: null,
      pesi: null,
      basicData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
    }
  },
  created() {
    this.pesiService = new PesiService();
  },
  mounted() {
    this.getPesi();
  },
  methods: {
    getPesi() {
      this.pesiService.getAll().then(data => {
        this.pesi = data;
      });
    }
  }
}
</script>

<style scoped>

</style>
