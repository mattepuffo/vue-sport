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
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
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
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
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
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
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
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card mb-0 mt-5">
        <FullCalendar :events="events" :options="options"/>
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

export default {
  data() {
    return {
      allService: null,
      utilService: null,
      currAnno: null,
      prevAnno: null,
      prevAnno2: null,
      cntCurr: null,
      cntPrev: null,
      cntPrev2: null,
      products: null,
      totQta: null,
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialDate: new Date(),
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true
      },
      events: null
    }
  },
  created() {
    this.allService = new AllenamentiService();
    this.utilService = new UtilService();
  },
  mounted() {
    this.getAllenamenti();
    this.getSum();
  },
  methods: {
    getAllenamenti() {
      this.allService.getAll().then(data => {
        // console.log(data);
        this.events = data;
        this.totQta = data.length;
      });
    },
    getSum() {
      this.allService.sumAnno().then(data => {
        // console.log(data);

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
