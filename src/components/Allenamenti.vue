<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>{{ title }}</h5>
        <p>Totale: {{ allenamenti ? allenamenti.length : 0 }}</p>

        <div>
          <DataTable :value="allenamenti" responsiveLayout="stack" breakpoint="960px" sortField="data" :sortOrder="-1"
                     :paginator="true" :rows="20" :rowsPerPageOptions="[10,20,50]" :rowHover="true" filterDisplay="row"
                     v-model:filters="filters1" :globalFilterFields="['allenamento', 'data', 'finito', 'note']"
                     :loading="loading1"
                     paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">

            <template #header>
              <div class="p-d-flex p-jc-end">
                <span class="p-input-icon-left ">
                    <i class="pi pi-search"/>
                    <InputText v-model="filters1['global'].value" placeholder="Keyword Search"/>
                </span>
              </div>
            </template>

            <template #empty>
              Nessun allenamento
            </template>

            <template #loading>
              Loading...
            </template>

            <Column field="title" header="Allenamento" :sortable="true"></Column>
            <Column field="data" header="Data" :sortable="true"></Column>
            <Column field="finito" header="Finito" :sortable="true">
              <template #body="allProps">
                <span>{{ (allProps.data.finito == 1) ? 'SI' : 'NO' }}</span>
              </template>
            </Column>
            <Column header="Note">
              <template #body="allProps">
                <span v-html="allProps.data.note"></span>
              </template>
            </Column>

          </DataTable>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AllenamentiService from "@/service/AllenamentiService";
import {FilterMatchMode} from "primevue/api";

export default {
  name: "Allenamenti",
  allService: null,
  data() {
    return {
      title: "Allenamenti",
      allenamenti: null,
      filters1: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      },
      loading1: true
    }
  },
  created() {
    console.clear();
    this.allService = new AllenamentiService();
  },
  mounted() {
    this.allService.getAll().then(data => {
      this.allenamenti = data;
      this.loading1 = false;
    });
  },
  methods: {
    clearFilter1() {
      this.initFilters1();
    },
    initFilters1() {
      this.filters1 = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep(.p-paginator) {

  .p-paginator-current {
    margin-left: auto;
  }

}

::v-deep(.p-progressbar) {
  height: .5rem;
  background-color: #D8DADC;

  .p-progressbar-value {
    background-color: #607D8B;
  }

}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }

}
</style>
