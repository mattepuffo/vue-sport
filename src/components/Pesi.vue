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
        labels: ['2022-02-01', '2022-04-01', ' 2022-03-02', '2022-05-10', '2022-05-23'],
        datasets: [
          {
            label: 'Andamento peso',
            data: [68.05, 69.90, 69.50, 70.07, 69.40],
            fill: false,
            borderColor: '#00b300',
            tension: .4
          }
        ]
      },
      basicOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
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
