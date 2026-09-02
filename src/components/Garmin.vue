<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ title }}</h5>
        <p>Totale: {{ allenamenti ? allenamenti.length : 0 }}</p>

        <DataTable :value="allenamenti"
                   :paginator="true"
                   :rows="20"
                   :rowsPerPageOptions="[10, 20, 50]"
                   :rowHover="true"
                   responsiveLayout="stack"
                   breakpoint="960px"
                   showGridlines
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                   paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
          <template #empty>
            Nessun allenamento
          </template>

          <Column field="data_allenamento" header="Data allenamento"></Column>
          <Column field="steps" header="Steps"></Column>
          <Column field="distance_km" header="Distanza (KM)"></Column>

          <Column header="" style="width: 5rem">
            <template #body="{ data }">
              <Button icon="pi pi-eye"
                      class="p-button-rounded p-button-info"
                      @click="openModal(data)"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <!-- ==================== MODALE DETTAGLIO ==================== -->
  <Dialog v-model:visible="modalVisible"
          :header="'Dettaglio - ' + (selectedItem?.data_allenamento || '')"
          :modal="true"
          :style="{ width: '55vw' }"
          :breakpoints="{ '960px': '80vw', '640px': '95vw' }"
          maximizable>

    <div v-if="selectedItem" class="p-3">

      <!-- ===== INFO PRINCIPALI ===== -->
      <div class="grid mb-4">
        <div class="col-12 md:col-6">
          <div class="info-box">
            <span class="label">ID</span>
            <span class="value">{{ selectedItem.id }}</span>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="info-box">
            <span class="label">Data Import</span>
            <span class="value">{{ selectedItem.data_import }}</span>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="info-box">
            <span class="label">Steps</span>
            <span class="value highlight">{{ selectedItem.steps?.toLocaleString() || '-' }}</span>
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="info-box">
            <span class="label">Distanza totale</span>
            <span class="value highlight">{{ formatKm(selectedItem.distance_km) }}</span>
          </div>
        </div>
      </div>

      <!-- ===== ATTIVITÀ ===== -->
      <h6 class="mt-4 mb-3">Attività registrate</h6>

      <div v-if="selectedItem.datiParsed?.activities?.length">
        <div v-for="(act, index) in selectedItem.datiParsed.activities" :key="index" class="activity-card mb-3">
          <div class="activity-header">
            <i class="pi pi-directions-alt mr-2"></i>
            <strong>{{ act.name || 'Attività' }}</strong>
            <Tag :value="formatType(act.type)" severity="info" class="ml-2"/>
          </div>

          <div class="grid mt-2">
            <div class="col-6 md:col-3">
              <small class="text-500">Durata</small>
              <div>{{ formatDuration(act.duration_sec) }}</div>
            </div>
            <div class="col-6 md:col-3">
              <small class="text-500">Distanza</small>
              <div>{{ formatKm(act.distance_km) }}</div>
            </div>
            <div class="col-6 md:col-3">
              <small class="text-500">Calorie</small>
              <div>{{ act.calories || '-' }} kcal</div>
            </div>
            <div class="col-6 md:col-3">
              <small class="text-500">Freq. media</small>
              <div>{{ act.avg_hr || '-' }} bpm</div>
            </div>
            <div class="col-12 md:col-6">
              <small class="text-500">Inizio</small>
              <div>{{ act.start_time || '-' }}</div>
            </div>
            <div class="col-12 md:col-6">
              <small class="text-500">Activity ID</small>
              <div class="text-sm">{{ act.activity_id || '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-500">
        Nessuna attività registrata
      </div>

      <!-- ===== JSON GREZZO (opzionale, collassabile) ===== -->
      <Panel header="JSON completo" :toggleable="true" :collapsed="true" class="mt-4">
        <pre class="json-raw">{{ JSON.stringify(selectedItem, null, 2) }}</pre>
      </Panel>
    </div>

    <template #footer>
      <Button label="Chiudi" icon="pi pi-times" class="p-button-text" @click="modalVisible = false"/>
    </template>
  </Dialog>

</template>

<script>
import {FilterMatchMode} from "primevue/api";
import GarminService from "@/service/GarminService";

export default {
  data() {
    return {
      title: "Garmin",
      allService: null,
      allenamenti: null,
      filters1: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      },
      modalVisible: false,
      selectedItem: null
    }
  },
  created() {
    this.allService = new GarminService();
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    getDatas() {
      this.allService.getAll().then(data => {
        this.allenamenti = data.map(item => {
          let parsed = {};
          try {
            parsed = JSON.parse(item.dati);
          } catch (e) {
            console.warn("Errore parsing dati per id", item.id, e);
          }

          return {
            ...item,
            steps: parsed.steps ?? null,
            distance_km: parsed.distance_km ?? null,
            datiParsed: parsed
          };
        });
      });
    },
    openModal(item) {
      this.selectedItem = item;
      this.modalVisible = true;
    },
    formatKm(value) {
      if (value == null) return '-';
      return Number(value).toFixed(2) + ' km';
    },
    formatDuration(seconds) {
      if (!seconds) return '-';
      const total = Math.round(seconds);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
    },
    formatType(type) {
      if (!type) return 'Sconosciuto';
      return type.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  }
}
</script>

<style lang="scss" scoped>
.info-box {
  background: var(--surface-50);
  border: 1px solid var(--surface-200);
  border-radius: 8px;
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;

  .label {
    font-size: 0.8rem;
    color: var(--text-color-secondary);
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1.15rem;
    font-weight: 600;
  }

  .highlight {
    color: var(--primary-color);
  }
}

.activity-card {
  background: var(--surface-0);
  border: 1px solid var(--surface-200);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .activity-header {
    display: flex;
    align-items: center;
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }
}

.json-raw {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  overflow: auto;
  max-height: 400px;
  margin: 0;
}

::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}
</style>