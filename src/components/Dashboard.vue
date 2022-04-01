<template>
  <div class="grid">

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Totale</span>
            <div class="text-900 font-medium text-xl">{{ totQta }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-globe text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Totale anno {{ currAnno }}</span>
            <div class="text-900 font-medium text-xl">{{ cntCurr }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-star-fill text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Totale anno {{ prevAnno }}</span>
            <div class="text-900 font-medium text-xl">{{ cntPrev }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-star text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Totale anno {{ prevAnno2 }}</span>
            <div class="text-900 font-medium text-xl">{{ cntPrev2 }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-ban text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card mb-0 mt-5">
        <FullCalendar :events="events" :options="options" ref="fc"/>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Statistiche</h5>
        <Chart type="bar" :data="basicData"/>
      </div>
    </div>

  </div>
</template>

<script>
import AllenamentiService from '@/service/AllenamentiService';
import UtilService from '@/service/UtilService';

import '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import router from "@/router";

export default {
  data() {
    return {
      ww: screen.width,
      allService: null,
      utilService: null,
      currAnno: null,
      prevAnno: null,
      prevAnno2: null,
      cntCurr: 0,
      cntPrev: 0,
      cntPrev2: 0,
      totQta: null,
      basicData: {
        labels: [],
        datasets: [],
      },
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialDate: new Date(),
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        firstDay: 1,
        initialView: 'dayGridMonth',
        // initialView: 'dayGridWeek',
        eventClick: this.handleDateClick,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: null,
        handleWindowResize: true
      },
    }
  },
  created() {
    this.allService = new AllenamentiService();
    this.utilService = new UtilService();
    window.addEventListener("resize", this.wResize);
  },
  mounted() {
    this.getAllenamenti();
    this.getSum();
    this.calendarChangeView();
    this.getMesiAnno();
  },
  methods: {
    wResize() {
      this.calendarChangeView();
    },
    calendarChangeView() {
      if (this.ww < 600) {
        this.$refs.fc.getApi().changeView('dayGridWeek');
      } else {
        this.$refs.fc.getApi().changeView('dayGridMonth');
      }
    },
    handleDateClick: function (info) {
      router.push({name: 'aggiungi', params: {id: info.event.id}})
    },
    getAllenamenti() {
      this.allService.getAll().then(data => {
        this.options.events = data;
        this.totQta = data.length;
      });
    },
    getMesiAnno() {
      this.allService.getMesiAnno().then(data => {
        this.basicData.datasets = data.datasets;
        this.basicData.labels = data.labels;
      });
    },
    getSum() {
      this.allService.sumAnno().then(data => {
        const current = data.slice(-1);
        const prev = data.slice(-2, -1);
        const prev2 = data.slice(-3, -2);

        this.currAnno = current[0].anno;
        this.prevAnno = prev[0].anno;
        this.prevAnno2 = prev2[0].anno;
        this.cntCurr = current[0].cnt;
        this.cntPrev = prev[0].cnt;
        this.cntPrev2 = prev2[0].cnt;
      });
    }
  }
}
</script>
