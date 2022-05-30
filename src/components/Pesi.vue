<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ title }}</h5>
        <Button icon="pi pi-download" class="p-button-rounded p-button-success" @click="downGrafico"/>

        <Chart id="chart_pesi" type="line" :data="basicData" :options="basicOptions"/>

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
        labels: [],
        datasets: [],
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
    this.getMesiAnno();
  },
  methods: {
    getMesiAnno() {
      this.pesiService.getMesiAnno().then(data => {
        this.basicData.datasets = data.datasets;
        this.basicData.labels = data.labels;
      });
    },
    downGrafico() {
      const chartAndamento = document.getElementById('chart_pesi');
      const canvasElement = chartAndamento.childNodes[0];

      const link = document.createElement('a');
      link.download = 'download.png';
      link.href = canvasElement.toDataURL();
      link.click();
    }
  }
}
</script>

<style scoped>

</style>
